/**
 * SensorTag model
 */
export default class SensorTag {
  /**
   * @constructor SensorTag
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * SensorTag ID.
     *
     * @member SensorTag#id
     * @type {string}
     */
    this.id = data.id;

    /**
     * SensorTag name.
     *
     * @member SensorTag#name
     * @type {string}
     */
    this.name = data.name;
  }
}
