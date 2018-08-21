/**
 * Sensor alert model
 */
export default class SensorAlert {
    /**
     * @constructor SensorAlert
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Sensor alert ID
         *
         * @member SensorAlert#id
         * @type {string}
         */
        this.id = data.id;

        /**
         * Threshold type
         *
         * @member SensorAlert#threshold_type
         * @type {string}
         */
        this.threshold_type = data.threshold_type;

        /**
         * Measurement type
         *
         * @member SensorAlert#measurement_type
         * @type {string}
         */
        this.measurement_type = data.measurement_type;

        /**
         * Threshold value
         *
         * @member SensorAlert#threshold_value
         * @type {*}
         */
        this.threshold_value = data.threshold_value;
    }
}