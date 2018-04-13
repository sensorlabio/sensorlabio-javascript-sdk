let axios = require('axios');

import UsersEndpoint from './src/endpoints/users';
import AuthEndpoint from './src/endpoints/auth';
import ProfileEndpoint from './src/endpoints/profile';
import SensorsEndpoint from './src/endpoints/sensors';
import MeasurementsEndpoint from './src/endpoints/measurements';

import ApiResponse from './src/responses/api';

/**
 * Sensorlab.io API.
 */
class Api {
    /**
     * Constructor.
     */
    constructor(rest_api_url = 'http://staging.sensorlab.io/api/v1', jwt_token = null) {
        this.rest_api_url = rest_api_url;

        this.users = new UsersEndpoint(this);
        this.auth = new AuthEndpoint(this);
        this.profile = new ProfileEndpoint(this);
        this.sensors = new SensorsEndpoint(this);
        this.measurements = new MeasurementsEndpoint(this);

        this.jwt_token = jwt_token;
    }

    /**
     * Set authentication jwt_token
     *
     * @param jwt_token
     */
    setToken(jwt_token) {
        this.jwt_token = jwt_token;
    }

    /**
     * Make requests to API with axios.
     *
     * @param endpoint_url
     * @param method
     * @param data
     * @param jwt_token
     * @returns {Promise.<*|InterceptorManager|AxiosResponse|AxiosInterceptorManager<AxiosResponse>|Object>}
     * @private
     */
    async _makeApiRequest(endpoint_url, method = 'GET', data = {}, params = {}, use_jwt_token = true) {
        let headers = { 'Content-Type': 'application/json' };
        let request_url = this.rest_api_url + endpoint_url;
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
        } catch (error) {
            response = error.response;
        }

        return response;
    }

    /**
     * Create ApiResponse from axios response data.
     *
     * @param response
     * @returns {ApiResponse}
     * @private
     */
    _prepareApiResponse(response) {
        if (response.status == 200) { //normal response
            if (response.data.token) {
                return new ApiResponse(true, response.status, 100, null, response.data.token);
            } else if (response.data.success) {
                return new ApiResponse(response.data.success, response.status, response.data.code, response.data.message);
            } else {
                return new ApiResponse(response.data.success, response.status, response.data.code, response.data.message);
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

module.exports = Api;