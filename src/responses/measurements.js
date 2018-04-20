import Measurement from '../models/measurement';

/**
 * Response with measurements data.
 */
export default class MeasurementsResponse {
    /**
     * @constructor MeasurementsResponse
     *
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Total amount of pages available.
         *
         * @member MeasurementsResponse#pages
         * @type {number}
         */
        this.pages = data.pages;

        /**
         * Total amount of measurements available.
         *
         * @member MeasurementsResponse#count
         * @type {number}
         */
        this.count = data.count;

        /**
         * List of measurements.
         *
         * @member MeasurementsResponse#measurements
         * @type {Measurement[]}
         */
        this.measurements = [];

        let self = this;
        data.result.forEach(function(measurement_data) {
            self.measurements.push(new Measurement(self.api, measurement_data));
        });
    }
}