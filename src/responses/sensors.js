import Sensor from '../models/sensor';

/**
 * Response with sensors data
 */
export default class SensorsResponse {
    /**
     * @constructor SensorsResponse
     *
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Total amount of pages available.
         *
         * @member SensorsResponse#pages
         * @type {number}
         */
        this.pages = data.pages;

        /**
         * Total amount of sensors available.
         *
         * @member SensorsResponse#count
         * @type {number}
         */
        this.count = data.count;

        /**
         * List of sensors.
         *
         * @member SensorsResponse#measurements
         * @type {Sensor[]}
         */
        this.sensors = [];

        let self = this;
        data.result.forEach(function(sensor_data) {
            self.sensors.push(new Sensor(self.api, sensor_data));
        });
    }
}