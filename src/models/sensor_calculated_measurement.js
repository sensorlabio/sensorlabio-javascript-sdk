/**
 * Sensor calculated measurement
 */
export default class SensorCalculatedMeasurement {
  /**
   * @constructor SensorCalculatedMeasurement
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * Sensor calculated measurement ID
     *
     * @member SensorCalculatedMeasurement#id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Measurement type
     *
     * @member SensorCalculatedMeasurement#measurementType
     * @type {string}
     */
    this.measurementType = data.measurementType;

    /**
     * Measurements calculation.
     *
     * @member SensorCalculatedMeasurement#calculation
     * @type {String}
     */
    this.calculation = data.calculation;
  }
}
