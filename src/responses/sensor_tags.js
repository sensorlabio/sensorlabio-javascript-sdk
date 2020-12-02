import SensorTag from '../models/sensor_tags';

/**
 * Response with sensor tags data
 */
export default class SensorTagsResponse {
  /**
   * @constructor SensorTagsResponse
   *
   * @param {SensorlabApi} api - parent api
   * @param {Object} data - data from response
   */
  constructor(api, data) {
    this.api = api;

    /**
     * List of sensor tags.
     *
     * @member SensorTagsResponse#sensorTags
     * @type {SensorTag[]}
     */
    this.sensorTags = [];

    let self = this;
    data.forEach(function (sensorTagData) {
      self.sensorTags.push(new SensorTag(self.api, sensorTagData));
    });
  }
}
