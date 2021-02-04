/**
 * @classdesc Measurement model
 */
export default class Measurement {
  /**
   * @constructor Measurement
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * Measurement ID.
     *
     * @member Measurement#id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Measurement type.
     *
     * @member Measurement#type
     * @type {string}
     */
    this.type = data.type;

    /**
     * Measurement values array.
     *
     * @member Measurement#value
     * @type {array}
     */
    this.value = data.value;

    /**
     * Created date.
     *
     * @member Measurement#timestamp
     * @type {Date}
     */
    this.timestamp = data.timestamp;

    /**
     * Sensor.
     *
     * @member Measurement#sensor
     * @type {Object}
     */
    this.sensor = data.sensor;
  }

  /**
   * Get sensor.
   *
   * @method Measurement#sensor
   * @returns {Promise.<ApiResponse>}
   */
  async sensor() {
    return this.api.sensors.one(this.sensor_id);
  }
}
