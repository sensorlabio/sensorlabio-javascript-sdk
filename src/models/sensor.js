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
         * Application ID.
         *
         * @member Sensor#application
         * @type {string}
         */
        this.application = data.application;

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
         * @type {number}
         */
        this.batteryCharge = data.batteryCharge;

        /**
         * Is battery charging?
         *
         * @member Sensor#isBatteryCharging
         * @type {boolean}
         */
        this.isBatteryCharging = data.isBatteryCharging;

        /**
         * Is sensor connected and online?
         *
         * @member Sensor#isOnline
         * @type {boolean}
         */
        this.isOnline = data.isOnline;

        /**
         * Is sensor public?
         *
         * @member Sensor#is_public
         * @type {boolean}
         */
        this.is_public = data.is_public;

        this.token = data.token;

        let self = this;

        /**
         * Access to measurments methods for current sensor.
         *
         * @member Sensor#measurements
         * @type {Object}
         */
        this.measurements = {
            'list': function(options) {
                if (options === undefined) {
                    options = {};
                }
                options['sensor'] = self.id;
                return self.api.measurements.list(options);
            },
            'last': function(options) {
                if (options === undefined) {
                    options = {};
                }
                options['sensor'] = self.id;
                return self.api.measurements.last(options);
            }
        }

    }
}