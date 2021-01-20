import UsersEndpoints from './endpoints/users';
import AuthEndpoints from './endpoints/auth';
import ApplicationsEndpoints from './endpoints/applications';
import ProfileEndpoints from './endpoints/profile';
import SensorsEndpoints from './endpoints/sensors';
import MeasurementsEndpoints from './endpoints/measurements';
import ApiResponse from './responses/api';
import ApiErrorBasicException from "./responses/errors/basic";
import ApiErrorUnauthorizedException from "./responses/errors/auth";
import ApiErrorNotFoundException from "./responses/errors/notfound";
import ApiErrorValidationException from "./responses/errors/validation";
import ApiErrorConnectionRefusedException from "./responses/errors/connection_refused";
import ApiErrorInternalException from "./responses/errors/internal";
import PublicEndpoints from "./endpoints/public";
import SensorAlertsEndpoints from "./endpoints/sensor_alerts";
import AlertsEndpoints from "./endpoints/alerts";
import ApiErrorForbiddenException from "./responses/errors/forbidden";
import SensorMeasurementsConfigsEndpoints from "./endpoints/sensor_measurements_configs";
import SensorTagsEndpoints from "./endpoints/sensor_tags";
import SensorCalculatedMeasurementsEndpoints from "./endpoints/sensor_calculated_measurements";

let axios = require('axios');

/**
 * @class SensorlabApi
 * @classdesc Main class that connects all the endpoints.
 */
export default class SensorlabApi {
  /**
   * @param {string} api_url - API's url.
   */
  constructor(api_url = 'https://staging.sensorlab.io/api') {
    /**
     * REST API url.
     *
     * @type {string}
     * @member SensorlabApi#rest_api_url
     * @private
     */
    this._rest_api_url = api_url;

    /**
     * Users endpoint.
     *
     * @member SensorlabApi#users
     * @private
     * @type {UsersEndpoints}
     */
    this._users = new UsersEndpoints(this);

    /**
     * Auth endpoints.
     *
     * @member SensorlabApi#auth
     * @type {AuthEndpoints}
     */
    this.auth = new AuthEndpoints(this);

    /**
     * Profile endpoints.
     *
     * @member SensorlabApi#profile
     * @type {ProfileEndpoints}
     */
    this.profile = new ProfileEndpoints(this);

    /**
     * Applications endpoints.
     *
     * @member SensorlabApi#applications
     * @type {ApplicationsEndpoints}
     */
    this.applications = new ApplicationsEndpoints(this);

    /**
     * Sensor endpoint.
     *
     * @member SensorlabApi#sensors
     * @type {SensorsEndpoints}
     */
    this.sensors = new SensorsEndpoints(this);

    /**
     * Sensor alerts endpoint.
     *
     * @member SensorlabApi#sensor_alerts
     * @type {SensorAlertsEndpoints}
     */
    this.sensor_alerts = new SensorAlertsEndpoints(this);

    /**
     * Sensor measurements config endpoint.
     *
     * @member SensorlabApi#sensor_measurements_configs
     * @type {SensorMeasurementsConfigsEndpoints}
     */
    this.sensor_measurements_configs = new SensorMeasurementsConfigsEndpoints(this);

    /**
     * Sensor calculated measurement endpoint.
     *
     * @member SensorlabApi#sensor_calcualted_measurement
     * @type {SensorCalculatedMeasurementsEndpoints}
     */
    this.sensor_calculated_measurements = new SensorCalculatedMeasurementsEndpoints(this);

    /**
     * Alerts endpoint.
     *
     * @member SensorlabApi#alerts
     * @type {AlertsEndpoints}
     */
    this.alerts = new AlertsEndpoints(this);

    /**
     * Measurements endpoints.
     *
     * @member SensorlabApi#measurements
     * @type {MeasurementsEndpoints}
     */
    this.measurements = new MeasurementsEndpoints(this);

    /**
     * Sensor Tags endpoints.
     *
     * @member SensorlabApi#sensorTags
     * @type {SensorTagsEndpoints}
     */
    this.sensorTags = new SensorTagsEndpoints(this);

    /**
     * Public endpoints.
     *
     * @member SensorlabApi#public
     * @type {PublicEndpoints}
     */
    this.public = new PublicEndpoints(this);

    /**
     * Saved JWT token
     *
     * @member SensorlabApi#jwt_token
     * @type {string}
     */
    this.jwt_token = null;
  }

  /**
   * Set authentication jwt token.
   *
   * @method SensorlabApi#setToken
   * @param {string} jwt_token saved token
   */
  setToken(jwt_token) {
    this.jwt_token = jwt_token;
  }

  /**
   * Get authentication jwt token.
   *
   * @method SensorlabApi#getToken
   * @returns {string}
   */
  getToken() {
    return this.jwt_token;
  }

  /**
   * Make requests to API with axios.
   *
   * @param {string} endpoint_url endpoint to send request to
   * @param {string} method method type
   * @param {object} data data to send with request
   * @param {boolean} jwt_token use request with token or not
   * @returns {Promise.<*|InterceptorManager|AxiosResponse|AxiosInterceptorManager<AxiosResponse>|Object>}
   * @method SensorlabApi#_makeApiRequest
   * @private
   */
  async _makeApiRequest(endpoint_url, method = 'GET', data = {}, params = {}, use_jwt_token = true) {
    let headers = {'Content-Type': 'application/json'};
    let request_url = this._rest_api_url + endpoint_url;

    if (use_jwt_token) {
      headers['Authorization'] = 'Bearer ' + this.jwt_token;
    }
    ;

    let response = null;

    try {
      response = await axios({
        params: params,
        method: method,
        url: request_url,
        data: data,
        headers: headers,
      });
    } catch (e) {
      if ('response' in e) {
        response = e.response;
      }
    }
    return response;
  }

  /**
   * Create ApiResponse from axios response data.
   *
   * @param {object} response response from axios
   * @param {function} success callback
   * @returns {ApiResponse}
   * @throws {ApiResponse}
   * @method SensorlabApi#_prepareApiResponse
   * @private
   */
  _prepareApiResponse(response, success_cb = null) {
    if (!response) {
      throw new ApiErrorConnectionRefusedException(0, 'Connection refused');
    }
    switch (response.status) {
      case 200:
        if (success_cb) {
          return success_cb(this, response);
        } else {
          return new ApiResponse(response.data.success, response.status, response.data.code, response.data.message);
        }
      case 401:
        throw new ApiErrorUnauthorizedException(response.status, response.data.message);
      case 403:
        throw new ApiErrorForbiddenException(response.status, response.data.message);
      case 404:
        throw new ApiErrorNotFoundException(response.status, response.data);
      case 422:
        throw new ApiErrorValidationException(response.status, response.data.message, response.data.errors);
      case 500:
        throw new ApiErrorInternalException(response.status, 'Internal Error');
      default:
        let message = null;
        if ('message' in response.data) {
          message = response.data.message;
        }
        throw new ApiErrorBasicException(response.status, message);
    }
  }
}
