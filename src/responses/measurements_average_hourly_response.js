import Measurement from '../models/measurement';
import MeasurementAverageHourly from "../models/measurement_average_hourly";

/**
 * @classdesc Response with measurements data.
 */
export default class MeasurementsAverageHourlyResponse {
  /**
   * @constructor MeasurementsResponse
   *
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * List of measurements.
     *
     * @member MeasurementsResponse#measurements
     * @type {Measurement[]}
     */
    this.measurements = [];

    let self = this;
    data.forEach(function (measurement_data) {
      self.measurements.push(new MeasurementAverageHourly(self.api, measurement_data));
    });
  }
}
