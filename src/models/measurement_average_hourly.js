/**
 * @classdesc MeasurementAverageHourly model
 */
export default class MeasurementAverageHourly {
    /**
     * @constructor MeasurementAverageHourly
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        this.hour = data.type;
        this.average = data.average;
    }
}
