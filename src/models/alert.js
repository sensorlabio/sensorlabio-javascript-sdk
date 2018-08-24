/**
 * Alert model
 */
export default class Alert {
    /**
     * @constructor Alert
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Affected measurement
         *
         * @member Alert#measurement
         * @type {object}
         */
        this.measurement = data.measurement;

        /**
         * Threshold
         *
         * @member Alert#threshold
         * @type {object}
         */
        this.threshold = data.threshold;
    }
}