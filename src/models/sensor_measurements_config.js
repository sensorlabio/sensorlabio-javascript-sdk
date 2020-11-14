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
     * @member SensorAlert#measurementType
     * @type {string}
     */
    this.measurementType = data.measurementType;

    /**
     * Widget
     *
     * @member SensorAlert#widgetType
     * @type {string}
     */
    this.widgetType = data.widgetType;

    /**
     * Measurement min
     *
     * @member SensorAlert#measurementMin
     * @type {number}
     */
    this.measurementMin = data.measurementMin;

    /**
     * Measurement max
     *
     * @member SensorAlert#measurementMax
     * @type {number}
     */
    this.measurementMax = data.measurementMax;

    /**
     * Measurement name
     *
     * @member SensorAlert#measurementName
     * @type {string}
     */
    this.measurementName = data.measurementName;

    /**
     * Measurement unit
     *
     * @member SensorAlert#measurementUnit
     * @type {string}
     */
    this.measurementUnit = data.measurementUnit;
  }
}