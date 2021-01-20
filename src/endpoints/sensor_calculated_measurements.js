import SensorCalculatedMeasurementsResponse from '../responses/sensor_calculated_measurements';
import SensorCalculatedMeasurement from '../models/sensor_calculated_measurement';

/**
 * Sensor calculated measurement endpoints.
 */
export default class SensorCalculatedMeasurementsEndpoints {
  /**
   * @constructor SensorCalculatedMeasurementEndpoints
   * @param {SensorlabApi} api - parent api
   */
  constructor(api) {
    /**
     * @member SensorCalculatedMeasurementEndpoints#api
     * @type {SensorlabApi}
     */
    this.api = api;
  }

  /**
   * Get sensor calculated measurement list
   *
   * @method SensorCalculatedMeasurementEndpoints#list
   * @param {string} sensor - Sensor ID.
   * @returns {Promise.<ApiResponse>}
   */
  async list(sensor) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/calculated_measurement', 'GET');
    return this.api._prepareApiResponse(response, this._successSensorCalculatedMeasurementListResponse);
  }

  /**
   * Get sensor calculated measurement by id
   *
   * @method SensorCalculatedMeasurementEndpoints#get
   * @param {string} sensor - Sensor ID
   * @param {string} calculated_measurement - Sensor calculated measurement ID
   * @returns {Promise.<ApiResponse>}
   */
  async get(sensor, calculated_measurement) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/calculated_measurement/' + calculated_measurement, 'GET');
    return this.api._prepareApiResponse(response, this._successSensorCalculatedMeasurementResponse);
  }

  /**
   * Create sensor calculated measurement.
   *
   * @method SensorCalculatedMeasurementEndpoints#create
   * @param {string} measurementType - Measurement type
   * @param {string} calculation - calculation string itself
   */
  async create(sensor, measurementType, calculation) {
    let data = {
      measurementType: measurementType,
      calculation: calculation,
    };
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/calculated_measurement', 'POST', data);
    return this.api._prepareApiResponse(response, this._successCreateSensorCalculatedMeasurementResponse);
  }

  /**
   * Update sensor calculated measurement.
   *
   * @method SensorCalculatedMeasurementEndpoints#update
   * @param {string} sensor - Sensor ID
   * @param {string} calculated_measurement - Sensor Calculated Measurement ID
   * @param {string} measurementType - Measurement type
   * @param {string} calculation - calculation string itself
   */
  async update(sensor, calculated_measurement, measurementType, calculation) {
    let data = {
      measurementType: measurementType,
      calculation: calculation,
    };
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/calculated_measurement/' + calculated_measurement, 'PATCH', data);
    return this.api._prepareApiResponse(response);
  }

  /**
   * Delete sensor calculated measurement.
   *
   * @method SensorCalculatedMeasurementEndpoints#delete
   * @param {string} sensor - Sensor ID
   * @param {string} calculated_measurement - Sensor calculated measurement ID
   * @returns {Promise.<ApiResponse>}
   */
  async delete(sensor, calculated_measurement) {
    let response = await this.api._makeApiRequest('/v1/sensors/' + sensor + '/calculated_measurement/' + calculated_measurement, 'DELETE');
    return this.api._prepareApiResponse(response);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorCalculatedMeasurementsResponse}
   * @private
   */
  _successSensorCalculatedMeasurementListResponse(api, response) {
    return new SensorCalculatedMeasurementsResponse(api, response.data);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorCalculatedMeasurement}
   * @private
   */
  _successSensorCalculatedMeasurementResponse(api, response) {
    return new SensorCalculatedMeasurement(api, response.data);
  }

  /**
   * Return success result.
   *
   * @param {SensorlabApi} api
   * @param {object} response
   * @returns {SensorCalculatedMeasurement}
   * @private
   */
  _successCreateSensorCalculatedMeasurementResponse(api, response) {
    return new SensorCalculatedMeasurement(api, response.data.calculatedMeasurement);
  }
}
