import SensorCalculatedMeasurement from '../models/sensor_calculated_measurement';

/**
 * Response with sensor calculated measurement data
 */
export default class SensorCalculatedMeasurementResponse {
  /**
   * @constructor SensorCalculatedMeasurementResponse
   *
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * List of sensors.
     *
     * @member SensorCalculatedMeasurementResponse#calculatedMeasurements
     * @type {SensorCalculatedMeasurement[]}
     */
    this.calculatedMeasurements = [];

    let self = this;
    data.forEach(function (calculated_measurement_data) {
      self.calculatedMeasurements.push(new SensorCalculatedMeasurement(self.api, calculated_measurement_data));
    });
  }
}
