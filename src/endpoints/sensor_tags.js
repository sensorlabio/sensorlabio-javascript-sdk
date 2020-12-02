import SensorTagsResponse from '../responses/sensor_tags';
import SensorTag from '../models/sensor_tags';

/**
 * Class for /sensor_tags/* endpoints.
 */
export default class SensorTagsEndpoints {
  /**
   * @constructor SensorTagsEndpoints
   * @param {SensorlabApi} api - parent api
   */
  constructor(api) {
    /**
     * @member SensorTagssEndpoints#api
     * @type {SensorlabApi}
     */
    this.api = api;
  }

  /**
   * Get sensor tags
   *
   * @method SensorTagssEndpoints#list
   * @param {string} options.name - search by name.
   * @returns {Promise.<ApiResponse>}
   */
  async list(options) {
    if (options === undefined) options = {};
    if (options.name === undefined) options.name = null;

    let params = {
      name: options.name,
    }
    let response = await this.api._makeApiRequest('/v1/sensor_tags', 'GET', {}, params, true);
    return this.api._prepareApiResponse(response, this._successSensorTagsListResponse);
  }

  /**
   * Get sensor tag by id
   *
   * @method SensorTagsEndpoints#get
   * @param {string} sensor_tag_id - sensor_tag_id
   * @returns {Promise.<ApiResponse>}
   */
  async get(sensor_tag_id) {
    let response = await this.api._makeApiRequest('/v1/sensor_tags/' + sensor_tag_id, 'GET', {}, {}, true);
    return this.api._prepareApiResponse(response, this._successSensorTagResponse);
  }

  /**
   * Create sensor tag.
   *
   * @method SensorTagsEndpoints#create
   * @param {string} name - tag name
   */
  async create(name) {
    let data = {
      'name': name,
    }
    let response = await this.api._makeApiRequest('/v1/sensor_tags', 'POST', data);
    return this.api._prepareApiResponse(response, this._successCreateSensorTagResponse);
  }

  /**
   * Delete sensor tag by id.
   *
   * @method SensorTagsEndpoints#delete
   * @param {string} sensor_tag_id - sensor_tag_id
   * @returns {Promise.<ApiResponse>}
   */
  async delete(sensor_tag_id) {
    let response = await this.api._makeApiRequest('/v1/sensor_tags/' + sensor_tag_id, 'DELETE', {}, {}, true);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorTagsResponse}
   * @private
   */
  _successSensorTagsListResponse(api, response) {
    return new SensorTagsResponse(api, response.data);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorTag}
   * @private
   */
  _successSensorTagResponse(api, response) {
    return new SensorTag(api, response.data);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorTag}
   * @private
   */
  _successCreateSensorTagResponse(api, response) {
    return new SensorTag(api, response.data.sensor_tag);
  }
}
