import SensorsResponse from '../responses/sensors';
import Sensor from '../models/sensor';

/**
 * Class for /sensors/* endpoints.
 */
export default class SensorsEndpoints {
  /**
   * @constructor SensorsEndpoints
   * @param {SensorlabApi} api - parent api
   */
  constructor(api) {
    /**
     * @member SensorsEndpoints#api
     * @type {SensorlabApi}
     */
    this.api = api;
  }

  /**
   * Get sensors list.
   *
   * @method SensorsEndpoints#list
   * @param {object} options - method options
   * @param {number} options.page - page number to display. Default is `1`.
   * @param {string} options.name - filter by name.
   * @param {string} options.id - filter by id.
   * @param {string} options.imei - filter by imei.
   * @param {string} options.sort - sorting parameter
   * @param {string} options.online_status - pass "online" to search for online sensors or "offline" for offline sensors.
   * @param {string} options.battery_charge_min - filter sensors by battery charge
   * @param {string} options.battery_charge_max - filter sensors by battery charge
   * @param {string} options.application - filter by application id
   * @returns {Promise.<ApiResponse>}
   */
  async list(options) {
    if (options === undefined) options = {};
    if (options.page === undefined) options.page = 1;
    if (options.name === undefined) options.name = null;
    if (options.id === undefined) options.id = null;
    if (options.imei === undefined) options.imei = null;
    if (options.sort === undefined) options.sort = null;
    if (options.online_status === undefined) options.online_status = null;
    if (options.battery_charge_min === undefined) options.battery_charge_min = null;
    if (options.battery_charge_max === undefined) options.battery_charge_max = null;
    if (options.application === undefined) options.application = null;
    if (options.getAll === undefined) options.getAll = null;
    if (options.withMeasurementsConfigs === undefined) options.withMeasurementsConfigs = null;
    if (options.tags === undefined) options.tags = null;

    let params = {
      page: options.page,
      name: options.name,
      id: options.id,
      imei: options.imei,
      sort: options.sort,
      online_status: options.online_status,
      battery_charge_min: options.battery_charge_min,
      battery_charge_max: options.battery_charge_max,
      application: options.application,
      getAll: options.getAll,
      withMeasurementsConfigs: options.withMeasurementsConfigs,
      tags: options.tags,
    };
    let response = await this.api._makeApiRequest('/v1/sensors', 'GET', {}, params, true);
    return this.api._prepareApiResponse(response, this._successSensorsListResponse);
  }

  /**
   * Get sensor by id.
   *
   * @method SensorsEndpoints#one
   * @param {string} sensor_id - sensor's id
   * @returns {Promise.<ApiResponse>}
   */
  async get(sensor_id) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor_id, 'GET', {}, {}, true);
    return this.api._prepareApiResponse(response, this._successSensorResponse);
  }

  /**
   * Create sensor.
   *
   * @method SensorsEndpoints#update
   * @param {string} imei - IMEI of the device
   * @param {string} name - sensor's name
   * @param {Array} applications - application id to assign to
   * @param {boolean|null} is_public - set sensor private or public
   */
  async create(imei, name, macAddress = null, authenticateWithMac = null,
               applications = [], owner = null, is_public = null,
               sensorTags = []) {
    let data = {
      'imei': imei,
      'name': name,
      'owner': owner,
    };
    if (applications !== null) {
      data['applications'] = applications;
    }
    if (sensorTags !== null) {
      data['sensorTags'] = sensorTags;
    }
    if (is_public !== null) {
      data['is_public'] = is_public;
    }
    if (macAddress !== null) {
      data['macAddress'] = macAddress;
    }
    if (authenticateWithMac !== null) {
      data['authenticateWithMac'] = authenticateWithMac;
    }
    let response = await this.api._makeApiRequest('/v1/sensors/create', 'POST', data);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Update sensors.
   *
   * @method SensorsEndpoints#update
   * @param {string} sensor_id - id of sensor to update
   * @param {string} name - sensor's name
   * @param {string} applications - application id to assign to
   * @param {boolean} is_public - set sensor private or public
   */
  async update(sensor_id, name, imei = null, macAddress = null,
               authenticateWithMac = null, applications = [], owner = null,
               is_public = null, sensorTags = []) {
    let data = {
      'name': name,
      'owner': owner,
    };
    if (applications !== null) {
      data['applications'] = applications;
    }
    if (sensorTags !== null) {
      data['sensorTags'] = sensorTags;
    }
    if (is_public !== null) {
      data['is_public'] = is_public;
    }
    if (macAddress !== null) {
      data['macAddress'] = macAddress;
    }
    if (authenticateWithMac !== null) {
      data['authenticateWithMac'] = authenticateWithMac;
    }
    if (imei !== null) {
      data['imei'] = imei;
    }
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor_id, 'PATCH', data);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Delete sensor by id.
   *
   * @method ApplicationsEndpoints#delete
   * @param {string} sensor_id - sensor_id
   * @returns {Promise.<ApiResponse>}
   */
  async delete(sensor_id) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor_id, 'DELETE', {}, {}, true);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorsResponse}
   * @private
   */
  _successSensorsListResponse(api, response) {
    return new SensorsResponse(api, response.data);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {Sensor}
   * @private
   */
  _successSensorResponse(api, response) {
    return new Sensor(api, response.data);
  }
}
