import UsersEndpoint from './endpoints/users';
import AuthEndpoint from './endpoints/auth';
import ApplicationsEndpoint from './endpoints/applications';
import ProfileEndpoint from './endpoints/profile';
import SensorsEndpoint from './endpoints/sensors';
import MeasurementsEndpoint from './endpoints/measurements';
import ApiResponse from './responses/api';
import DemoEndpoint from './endpoints/demo';
import DemoWidgets from './widgets/demo';
import Widgets from './widgets/widgets';
import ApiErrorBasicException from "./responses/errors/basic";
import ApiErrorUnauthorizedException from "./responses/errors/auth";
import ApiErrorNotFoundException from "./responses/errors/notfound";
import ApiErrorValidationException from "./responses/errors/validation";
import ApiErrorConnectionRefusedException from "./responses/errors/connection_refused";
import ApiErrorInteralException from "./responses/errors/internal";
let axios = require('axios');

/**
 * @classdesc Main class that connects all the endpoints.
 */
export class SensorlabApi {
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
         * @type {UsersEndpoint}
         */
        this._users = new UsersEndpoint(this);

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
         * Applications endpoints.
         *
         * @member SensorlabApi#applications
         * @type {ApplicationsEndpoint}
         */
        this.applications = new ApplicationsEndpoint(this);

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

        /**
         * Demo endpoints.
         *
         * @member SensorlabApi#demo
         * @type {DemoEndpoint}
         */
        this.demo = new DemoEndpoint(this);

        /**
         * Widgets.
         *
         * @member SensorlabApi#widgets
         * @type {Widgets}
         */
        this.widgets = new Widgets(this);

        /**
         * Demo widgets.
         *
         * @member SensorlabApi#demo_widgets
         * @type {DemoWidgets}
         */
        this.demo_widgets = new DemoWidgets(this);
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
            case 404:
                throw new ApiErrorNotFoundException(response.status, response.data);
            case 422:
                throw new ApiErrorValidationException(response.status, response.data.message, response.data.errors);
            case 500:
                throw new ApiErrorInteralException(response.status, 'Internal Error');
            default:
                let message = null;
                if ('message' in response.data) {
                    message = response.data.message;
                }
                throw new ApiErrorBasicException(response.status, message);
        }
    }
}