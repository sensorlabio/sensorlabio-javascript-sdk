import SensorMeasurementsConfigsResponse from '../responses/sensor_measurements_configs';
import SensorMeasurementsConfig from '../models/sensor_measurements_config';

/**
 * Sensor measurements configs endpoints.
 */
export default class SensorMeasurementsConfigsEndpoints {
  /**
   * @constructor SensorMeasurementsConfigsEndpoints
   * @param {SensorlabApi} api - parent api
   */
  constructor(api) {
    /**
     * @member SensorMeasurementsConfigsEndpoints#api
     * @type {SensorlabApi}
     */
    this.api = api;
  }

  /**
   * Get sensor measurements configs list
   *
   * @method SensorMeasurementsConfigsEndpoints#list
   * @param {string} sensor - Sensor ID.
   * @returns {Promise.<ApiResponse>}
   */
  async list(sensor) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/measuremenets_config', 'GET');
    return this.api._prepareApiResponse(response, this._successSensorMeasurementsConfigsListResponse);
  }

  /**
   * Get sensor measurements config by id
   *
   * @method SensorMeasurementsConfigsEndpoints#get
   * @param {string} sensor - Sensor ID
   * @param {string} measurements_config - Sensor measurements config ID
   * @returns {Promise.<ApiResponse>}
   */
  async get(sensor, measurements_config) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/measurements_config/' + measurements_config, 'GET');
    return this.api._prepareApiResponse(response, this._successSensorMeasurementsConfigResponse);
  }

  /**
   * Create sensor measurements config.
   *
   * @method SensorMeasurementsConfigEndpoints#create
   * @param {string} measurementType - Measurement type
   * @param {string} widgetType - Widget type
   * @param {number} measurementMin - Measurement min
   * @param {number} measurementMin - Measurement max
   */
  async create(sensor, measurementType, widgetType, measurementMin, measurementMax) {
    let data = {
      measurementType: measurementType,
      widgetType: widgetType,
      measurementMin: measurementMin,
      measurementMax: measurementMax,
    };
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/measurements_config', 'POST', data);
    return this.api._prepareApiResponse(response, this._successCreateSensorMeasurementsConfigResponse);
  }

  /**
   * Update sensor measurements_config.
   *
   * @method SensorMeasurementsConfigEndpoints#update
   * @param {string} sensor - Sensor ID
   * @param {string} measurements_config - Sensor Measurements Config ID
   * @param {string} measurementType - Measurement type
   * @param {string} widgetType - Widget type
   * @param {number} measurementMin - Measurement min
   * @param {number} measurementMin - Measurement max
   */
  async update(sensor, measurements_config, measurementType, widgetType, measurementMin, measurementMax) {
    let data = {
      measurementType: measurementType,
      widgetType: widgetType,
      measurementMin: measurementMin,
      measurementMax: measurementMax,
    };
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/measurements_config/' + measurements_config, 'PATCH', data);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Delete sensor measurements config.
   *
   * @method SensorMeasurementsConfigEndpoints#delete
   * @param {string} sensor - Sensor ID
   * @param {string} measurements_config - Sensor measurements config ID
   * @returns {Promise.<ApiResponse>}
   */
  async delete(sensor, measurements_config) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/measurements_config/' + measurements_config, 'DELETE');
    return this.api._prepareApiResponse(response);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorMeasurementsConfigsResponse}
   * @private
   */
  _successSensorMeasurementsConfigsListResponse(api, response) {
    return new SensorMeasurementsConfigsResponse(api, response.data);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorMeasurementsConfig}
   * @private
   */
  _successSensorMeasurementsConfigResponse(api, response) {
    return new SensorMeasurementsConfig(api, response.data);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorMeasurementsConfig}
   * @private
   */
  _successCreateSensorMeasurementsConfigResponse(api, response) {
    return new SensorMeasurementsConfig(api, response.data.measurementsConfig);
  }
}
