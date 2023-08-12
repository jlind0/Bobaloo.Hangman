/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { Logger } from '@azure/msal-common';
import { buildConfiguration } from '../config/Configuration.mjs';
import { name, version } from '../packageMetadata.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base class for operating context
 * Operating contexts are contexts in which MSAL.js is being run
 * More than one operating context may be available at a time
 * It's important from a logging and telemetry point of view for us to be able to identify the operating context.
 * For example: Some operating contexts will pre-cache tokens impacting performance telemetry
 */
class BaseOperatingContext {
    constructor(config) {
        /*
         * If loaded in an environment where window is not available,
         * set internal flag to false so that further requests fail.
         * This is to support server-side rendering environments.
         */
        this.browserEnvironment = typeof window !== "undefined";
        this.config = buildConfiguration(config, this.browserEnvironment);
        this.logger = new Logger(this.config.system.loggerOptions, name, version);
        this.available = false;
    }
    /**
     * Return the MSAL config
     * @returns BrowserConfiguration
     */
    getConfig() {
        return this.config;
    }
    /**
     * Returns the MSAL Logger
     * @returns Logger
     */
    getLogger() {
        return this.logger;
    }
    isAvailable() {
        return this.available;
    }
    isBrowserEnvironment() {
        return this.browserEnvironment;
    }
}

export { BaseOperatingContext };
//# sourceMappingURL=BaseOperatingContext.mjs.map