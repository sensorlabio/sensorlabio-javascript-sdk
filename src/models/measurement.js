/**
 * @classdesc Measurement model
 */
export default class Measurement {
    /**
     * @constructor Measurement
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Measurement ID.
         *
         * @member Measurement#id
         * @type {string}
         */
        this.id = data.id;

        /**
         * Parent sensor ID.
         *
         * @member Measurement#sensor_id
         * @type {string}
         */
        this.sensor_id = data.sensor;

        /**
         * Measurement type.
         *
         * @member Measurement#type
         * @type {string}
         */
        this.type = data.type;

        /**
         * Measurement values array.
         *
         * @member Measurement#value
         * @type {array}
         */
        this.value = data.value;

        /**
         * Created date.
         *
         * @member Measurement#created
         * @type {Date}
         */
        this.timestamp = data.timestamp;
    }

    /**
     * Get sensor.
     *
     * @method Measurement#sensor
     * @returns {Promise.<ApiResponse>}
     */
    async sensor() {
        return this.api.sensors.one(this.sensor_id);
    }
}