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

        this.date = data.date;
        this.hour = data.hour;
        this.average = data.average;
    }
}
