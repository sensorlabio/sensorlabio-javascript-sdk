/**
 * Sensor model
 */
export default class Sensor {
    /**
     * @constructor Sensor
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Sensor ID.
         *
         * @member Sensor#id
         * @type {string}
         */
        this.id = data.id;

        /**
         * Sensor unique id.
         *
         * @member Sensor#uniqueid
         * @type {string}
         */
        this.uniqueid = data.uniqueid;

        /**
         * Sensor IMEI.
         *
         * @member Sensor#imei
         * @type {string}
         */
        this.imei = data.imei;

        /**
         * Sensor name.
         *
         * @member Sensor#name
         * @type {string}
         */
        this.name = data.name;

        /**
         * Date/time created.
         *
         * @member Sensor#created
         * @type {*}
         */
        this.created = data.created;

        /**
         * Battery charge.
         *
         * @member Sensor#batteryCharge
         * @type {Number}
         */
        this.batteryCharge = data.batteryCharge;

        let self = this;

        /**
         * Access to measurments methods for current sensor.
         *
         * @member Sensor#measurements
         * @type {Object}
         */
        this.measurements = {
            'list': function(options) {
                return self.api.measurements.list(options);
            },
            'last': function(options) {
                return self.api.measurements.last(options);
            }
        }

    }
}