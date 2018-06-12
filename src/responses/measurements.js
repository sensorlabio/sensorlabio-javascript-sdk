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
         * Next measurement id for pagination.
         *
         * @member MeasurementsResponse#next
         * @type {string}
         */
        this.next = data.next;

        /**
         * Previous measurement id for pagination.
         *
         * @member MeasurementsResponse#prev
         * @type {string}
         */
        this.prev = data.prev;

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