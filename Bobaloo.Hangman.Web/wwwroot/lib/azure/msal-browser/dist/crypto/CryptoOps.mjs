/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { PerformanceEvents, JoseHeader } from '@azure/msal-common';
import { GuidGenerator } from './GuidGenerator.mjs';
import { Base64Encode } from '../encode/Base64Encode.mjs';
import { Base64Decode } from '../encode/Base64Decode.mjs';
import { PkceGenerator } from './PkceGenerator.mjs';
import { BrowserCrypto } from './BrowserCrypto.mjs';
import { BrowserStringUtils } from '../utils/BrowserStringUtils.mjs';
import { BrowserAuthError } from '../error/BrowserAuthError.mjs';
import { CryptoKeyStore } from '../cache/CryptoKeyStore.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements MSAL's crypto interface, which allows it to perform base64 encoding and decoding, generating cryptographically random GUIDs and
 * implementing Proof Key for Code Exchange specs for the OAuth Authorization Code Flow using PKCE (rfc here: https://tools.ietf.org/html/rfc7636).
 */
class CryptoOps {
    constructor(logger, performanceClient) {
        this.logger = logger;
        // Browser crypto needs to be validated first before any other classes can be set.
        this.browserCrypto = new BrowserCrypto(this.logger);
        this.b64Encode = new Base64Encode();
        this.b64Decode = new Base64Decode();
        this.guidGenerator = new GuidGenerator(this.browserCrypto);
        this.pkceGenerator = new PkceGenerator(this.browserCrypto);
        this.cache = new CryptoKeyStore(this.logger);
        this.performanceClient = performanceClient;
    }
    /**
     * Creates a new random GUID - used to populate state and nonce.
     * @returns string (GUID)
     */
    createNewGuid() {
        return this.guidGenerator.generateGuid();
    }
    /**
     * Encodes input string to base64.
     * @param input
     */
    base64Encode(input) {
        return this.b64Encode.encode(input);
    }
    /**
     * Decodes input string from base64.
     * @param input
     */
    base64Decode(input) {
        return this.b64Decode.decode(input);
    }
    /**
     * Generates PKCE codes used in Authorization Code Flow.
     */
    async generatePkceCodes() {
        return this.pkceGenerator.generateCodes();
    }
    /**
     * Generates a keypair, stores it and returns a thumbprint
     * @param request
     */
    async getPublicKeyThumbprint(request) {
        const publicKeyThumbMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.CryptoOptsGetPublicKeyThumbprint, request.correlationId);
        // Generate Keypair
        const keyPair = await this.browserCrypto.generateKeyPair(CryptoOps.EXTRACTABLE, CryptoOps.POP_KEY_USAGES);
        // Generate Thumbprint for Public Key
        const publicKeyJwk = await this.browserCrypto.exportJwk(keyPair.publicKey);
        const pubKeyThumprintObj = {
            e: publicKeyJwk.e,
            kty: publicKeyJwk.kty,
            n: publicKeyJwk.n,
        };
        const publicJwkString = BrowserStringUtils.getSortedObjectString(pubKeyThumprintObj);
        const publicJwkHash = await this.hashString(publicJwkString);
        // Generate Thumbprint for Private Key
        const privateKeyJwk = await this.browserCrypto.exportJwk(keyPair.privateKey);
        // Re-import private key to make it unextractable
        const unextractablePrivateKey = await this.browserCrypto.importJwk(privateKeyJwk, false, ["sign"]);
        // Store Keypair data in keystore
        await this.cache.asymmetricKeys.setItem(publicJwkHash, {
            privateKey: unextractablePrivateKey,
            publicKey: keyPair.publicKey,
            requestMethod: request.resourceRequestMethod,
            requestUri: request.resourceRequestUri,
        });
        if (publicKeyThumbMeasurement) {
            publicKeyThumbMeasurement.end({
                success: true,
            });
        }
        return publicJwkHash;
    }
    /**
     * Removes cryptographic keypair from key store matching the keyId passed in
     * @param kid
     */
    async removeTokenBindingKey(kid) {
        await this.cache.asymmetricKeys.removeItem(kid);
        const keyFound = await this.cache.asymmetricKeys.containsKey(kid);
        return !keyFound;
    }
    /**
     * Removes all cryptographic keys from IndexedDB storage
     */
    async clearKeystore() {
        return await this.cache.clear();
    }
    /**
     * Signs the given object as a jwt payload with private key retrieved by given kid.
     * @param payload
     * @param kid
     */
    async signJwt(payload, kid, correlationId) {
        const signJwtMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.CryptoOptsSignJwt, correlationId);
        const cachedKeyPair = await this.cache.asymmetricKeys.getItem(kid);
        if (!cachedKeyPair) {
            throw BrowserAuthError.createSigningKeyNotFoundInStorageError(kid);
        }
        // Get public key as JWK
        const publicKeyJwk = await this.browserCrypto.exportJwk(cachedKeyPair.publicKey);
        const publicKeyJwkString = BrowserStringUtils.getSortedObjectString(publicKeyJwk);
        // Base64URL encode public key thumbprint with keyId only: BASE64URL({ kid: "FULL_PUBLIC_KEY_HASH" })
        const encodedKeyIdThumbprint = this.b64Encode.urlEncode(JSON.stringify({ kid: kid }));
        // Generate header
        const shrHeader = JoseHeader.getShrHeaderString({
            kid: encodedKeyIdThumbprint,
            alg: publicKeyJwk.alg,
        });
        const encodedShrHeader = this.b64Encode.urlEncode(shrHeader);
        // Generate payload
        payload.cnf = {
            jwk: JSON.parse(publicKeyJwkString),
        };
        const encodedPayload = this.b64Encode.urlEncode(JSON.stringify(payload));
        // Form token string
        const tokenString = `${encodedShrHeader}.${encodedPayload}`;
        // Sign token
        const tokenBuffer = BrowserStringUtils.stringToUtf8Arr(tokenString);
        const signatureBuffer = await this.browserCrypto.sign(cachedKeyPair.privateKey, tokenBuffer);
        const encodedSignature = this.b64Encode.urlEncodeArr(new Uint8Array(signatureBuffer));
        const signedJwt = `${tokenString}.${encodedSignature}`;
        if (signJwtMeasurement) {
            signJwtMeasurement.end({
                success: true,
            });
        }
        return signedJwt;
    }
    /**
     * Returns the SHA-256 hash of an input string
     * @param plainText
     */
    async hashString(plainText) {
        const hashBuffer = await this.browserCrypto.sha256Digest(plainText);
        const hashBytes = new Uint8Array(hashBuffer);
        return this.b64Encode.urlEncodeArr(hashBytes);
    }
}
CryptoOps.POP_KEY_USAGES = ["sign", "verify"];
CryptoOps.EXTRACTABLE = true;

export { CryptoOps };
//# sourceMappingURL=CryptoOps.mjs.map
