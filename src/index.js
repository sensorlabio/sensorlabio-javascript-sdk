let axios = require('axios');

import UsersEndpoint from './endpoints/users';
import AuthEndpoint from './endpoints/auth';
import ProfileEndpoint from './endpoints/profile';
import SensorsEndpoint from './endpoints/sensors';
import MeasurementsEndpoint from './endpoints/measurements';

import ApiResponse from './responses/api';

/**
 * @classdesc Main class that connects all the endpoints.
 */
export default class SensorlabApi {
    /**
     * @constructor SensorlabApi
     * @param {string} api_url - API's url.
     */
    constructor(api_url = 'http://staging.sensorlab.io/api/v1') {
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
         * @type {UsersEndpoint}
         */
        this.users = new UsersEndpoint(this);

        /**
         * Auth endpoints.
         *
         * @member SensorlabApi#auth
         * @type {AuthEndpoint}
         */
        this.auth = new AuthEndpoint(this);

        /**
         * Profile endpoints.
         *
         * @member SensorlabApi#profile
         * @type {ProfileEndpoint}
         */
        this.profile = new ProfileEndpoint(this);

        /**
         * Sensor endpoint.
         *
         * @member SensorlabApi#sensors
         * @type {SensorsEndpoint}
         */
        this.sensors = new SensorsEndpoint(this);

        /**
         * Measurements endpoints.
         *
         * @member SensorlabApi#measurements
         * @type {MeasurementsEndpoint}
         */
        this.measurements = new MeasurementsEndpoint(this);

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
        let headers = { 'Content-Type': 'application/json' };
        let request_url = this._rest_api_url + endpoint_url;
        if (use_jwt_token) {
            headers['Authorization'] = 'Bearer ' + this.jwt_token;
        };

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
     * @returns {ApiResponse}
     * @throws {ApiResponse}
     * @method SensorlabApi#_prepareApiResponse
     * @private
     */
    _prepareApiResponse(response) {
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status == 200) { //normal response
            if (response.data.token) {
                return new ApiResponse(true, response.status, 100, null, response.data.token);
            } else if (response.data.success) {
                return new ApiResponse(response.data.success, response.status, response.data.code, response.data.message);
            } else {
                throw new ApiResponse(response.data.success, response.status, response.data.code, response.data.message);
            }
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            let message = null;
            if ('message' in response.data) {
                message = response.data.message;
            }
            throw new ApiResponse(false, response.status, 0, message);
        }
    }
}