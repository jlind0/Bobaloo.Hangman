/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class MemoryStorage {
    constructor() {
        this.cache = new Map();
    }
    getItem(key) {
        return this.cache.get(key) || null;
    }
    setItem(key, value) {
        this.cache.set(key, value);
    }
    removeItem(key) {
        this.cache.delete(key);
    }
    getKeys() {
        const cacheKeys = [];
        this.cache.forEach((value, key) => {
            cacheKeys.push(key);
        });
        return cacheKeys;
    }
    containsKey(key) {
        return this.cache.has(key);
    }
    clear() {
        this.cache.clear();
    }
}

export { MemoryStorage };
//# sourceMappingURL=MemoryStorage.mjs.map