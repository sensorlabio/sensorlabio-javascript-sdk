/**
 * Sensor alert model
 */
export default class SensorMeasurementsConfig {
  /**
   * @constructor SensorMeasurementsConfig
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * Sensor measurements config ID
     *
     * @member SensorMeasurementsConfig#id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Measurement type
     *
     * @member SensorMeasurementsConfig#measurementType
     * @type {string}
     */
    this.measurementType = data.measurementType;

    /**
     * Widget
     *
     * @member SensorMeasurementsConfig#widgetType
     * @type {string}
     */
    this.widgetType = data.widgetType;

    /**
     * Measurement min
     *
     * @member SensorMeasurementsConfig#measurementMin
     * @type {number}
     */
    this.measurementMin = data.measurementMin;

    /**
     * Measurement max
     *
     * @member SensorMeasurementsConfig#measurementMax
     * @type {number}
     */
    this.measurementMax = data.measurementMax;

    /**
     * Measurement name
     *
     * @member SensorMeasurementsConfig#measurementName
     * @type {string}
     */
    this.measurementName = data.measurementName;

    /**
     * Measurement unit
     *
     * @member SensorMeasurementsConfig#measurementUnit
     * @type {string}
     */
    this.measurementUnit = data.measurementUnit;

    /**
     * Is calculated measurement.
     *
     * @member SensorMeasurementsConfig#isCalculated
     * @type {Boolean}
     */
    this.isCalculated = data.isCalculated;

    /**
     * Measurements calculation.
     *
     * @member SensorMeasurementsConfig#calculation
     * @type {String}
     */
    this.calculation = data.calculation;
  }
}
