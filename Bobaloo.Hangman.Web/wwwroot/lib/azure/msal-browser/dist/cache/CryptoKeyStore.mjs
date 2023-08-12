/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { AsyncMemoryStorage } from './AsyncMemoryStorage.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const CryptoKeyStoreNames = {
    asymmetricKeys: "asymmetricKeys",
    symmetricKeys: "symmetricKeys",
};
/**
 * MSAL CryptoKeyStore DB Version 2
 */
class CryptoKeyStore {
    constructor(logger) {
        this.logger = logger;
        this.asymmetricKeys = new AsyncMemoryStorage(this.logger, CryptoKeyStoreNames.asymmetricKeys);
        this.symmetricKeys = new AsyncMemoryStorage(this.logger, CryptoKeyStoreNames.symmetricKeys);
    }
    async clear() {
        // Delete in-memory keystores
        this.asymmetricKeys.clearInMemory();
        this.symmetricKeys.clearInMemory();
        /**
         * There is only one database, so calling clearPersistent on asymmetric keystore takes care of
         * every persistent keystore
         */
        try {
            await this.asymmetricKeys.clearPersistent();
            return true;
        }
        catch (e) {
            if (e instanceof Error) {
                this.logger.error(`Clearing keystore failed with error: ${e.message}`);
            }
            else {
                this.logger.error("Clearing keystore failed with unknown error");
            }
            return false;
        }
    }
}

export { CryptoKeyStore, CryptoKeyStoreNames };
//# sourceMappingURL=CryptoKeyStore.mjs.map