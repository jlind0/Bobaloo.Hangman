/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class for math specific functions in browser.
 */
class MathUtils {
    /**
     * Decimal to Hex
     *
     * @param num
     */
    static decimalToHex(num) {
        let hex = num.toString(16);
        while (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    }
}

export { MathUtils };
//# sourceMappingURL=MathUtils.mjs.map
