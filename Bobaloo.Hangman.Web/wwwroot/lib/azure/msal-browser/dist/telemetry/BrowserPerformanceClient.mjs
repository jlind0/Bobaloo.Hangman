/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { PerformanceClient, Constants, Logger } from '@azure/msal-common';
import { BrowserCrypto } from '../crypto/BrowserCrypto.mjs';
import { GuidGenerator } from '../crypto/GuidGenerator.mjs';
import { BrowserPerformanceMeasurement } from './BrowserPerformanceMeasurement.mjs';
import { name, version } from '../packageMetadata.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class BrowserPerformanceClient extends PerformanceClient {
    constructor(configuration, intFields) {
        super(configuration.auth.clientId, configuration.auth.authority || `${Constants.DEFAULT_AUTHORITY}`, new Logger(configuration.system?.loggerOptions || {}, name, version), name, version, configuration.telemetry?.application || {
            appName: "",
            appVersion: "",
        }, intFields);
        this.browserCrypto = new BrowserCrypto(this.logger);
        this.guidGenerator = new GuidGenerator(this.browserCrypto);
    }
    startPerformanceMeasurement(measureName, correlationId) {
        return new BrowserPerformanceMeasurement(measureName, correlationId);
    }
    generateId() {
        return this.guidGenerator.generateGuid();
    }
    getPageVisibility() {
        return document.visibilityState?.toString() || null;
    }
    deleteIncompleteSubMeasurements(inProgressEvent) {
        const rootEvent = this.eventsByCorrelationId.get(inProgressEvent.event.correlationId);
        const isRootEvent = rootEvent && rootEvent.eventId === inProgressEvent.event.eventId;
        const incompleteMeasurements = [];
        if (isRootEvent && rootEvent?.incompleteSubMeasurements) {
            rootEvent.incompleteSubMeasurements.forEach((subMeasurement) => {
                incompleteMeasurements.push({ ...subMeasurement });
            });
        }
        // Clean up remaining marks for incomplete sub-measurements
        if (incompleteMeasurements.length > 0) {
            BrowserPerformanceMeasurement.flushMeasurements(inProgressEvent.event.correlationId, incompleteMeasurements);
        }
    }
    supportsBrowserPerformanceNow() {
        return (typeof window !== "undefined" &&
            typeof window.performance !== "undefined" &&
            typeof window.performance.now === "function");
    }
    /**
     * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
     * Also captures browser page visibilityState.
     *
     * @param {PerformanceEvents} measureName
     * @param {?string} [correlationId]
     * @returns {((event?: Partial<PerformanceEvent>) => PerformanceEvent| null)}
     */
    startMeasurement(measureName, correlationId) {
        // Capture page visibilityState and then invoke start/end measurement
        const startPageVisibility = this.getPageVisibility();
        const inProgressEvent = super.startMeasurement(measureName, correlationId);
        return {
            ...inProgressEvent,
            end: (event) => {
                const res = inProgressEvent.end({
                    startPageVisibility,
                    endPageVisibility: this.getPageVisibility(),
                    ...event,
                });
                this.deleteIncompleteSubMeasurements(inProgressEvent);
                return res;
            },
            discard: () => {
                inProgressEvent.discard();
                this.deleteIncompleteSubMeasurements(inProgressEvent);
                inProgressEvent.measurement.flushMeasurement();
            },
        };
    }
    /**
     * Adds pre-queue time to preQueueTimeByCorrelationId map.
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @returns
     */
    setPreQueueTime(eventName, correlationId) {
        if (!this.supportsBrowserPerformanceNow()) {
            this.logger.trace(`BrowserPerformanceClient: window performance API not available, unable to set telemetry queue time for ${eventName}`);
            return;
        }
        if (!correlationId) {
            this.logger.trace(`BrowserPerformanceClient: correlationId for ${eventName} not provided, unable to set telemetry queue time`);
            return;
        }
        const preQueueEvent = this.preQueueTimeByCorrelationId.get(correlationId);
        /**
         * Manually complete queue measurement if there is an incomplete pre-queue event.
         * Incomplete pre-queue events are instrumentation bugs that should be fixed.
         */
        if (preQueueEvent) {
            this.logger.trace(`BrowserPerformanceClient: Incomplete pre-queue ${preQueueEvent.name} found`, correlationId);
            this.addQueueMeasurement(preQueueEvent.name, correlationId, undefined, true);
        }
        this.preQueueTimeByCorrelationId.set(correlationId, {
            name: eventName,
            time: window.performance.now(),
        });
    }
    /**
     * Calculates and adds queue time measurement for given performance event.
     *
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @param {?number} queueTime
     * @param {?boolean} manuallyCompleted - indicator for manually completed queue measurements
     * @returns
     */
    addQueueMeasurement(eventName, correlationId, queueTime, manuallyCompleted) {
        if (!this.supportsBrowserPerformanceNow()) {
            this.logger.trace(`BrowserPerformanceClient: window performance API not available, unable to add queue measurement for ${eventName}`);
            return;
        }
        if (!correlationId) {
            this.logger.trace(`BrowserPerformanceClient: correlationId for ${eventName} not provided, unable to add queue measurement`);
            return;
        }
        const preQueueTime = super.getPreQueueTime(eventName, correlationId);
        if (!preQueueTime) {
            return;
        }
        const currentTime = window.performance.now();
        const resQueueTime = queueTime || super.calculateQueuedTime(preQueueTime, currentTime);
        return super.addQueueMeasurement(eventName, correlationId, resQueueTime, manuallyCompleted);
    }
}

export { BrowserPerformanceClient };
//# sourceMappingURL=BrowserPerformanceClient.mjs.map
