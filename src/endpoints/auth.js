import User from '../models/user';
import ApplicationToken from "../models/application_token";

/**
 * Class for /auth/* endpoints.
 */
export default class AuthEndpoints {
    /**
     * @constructor AuthEndpoints
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        /**
         * @member AuthEndpoints#api
         * @type {SensorlabApi}
         */
        this.api = api;
    }

    /**
     * Authorize with email and password and get authentication token.
     *
     * @method AuthEndpoints#user_token
     * @param {string} email user's email
     * @param {string} password user's password
     * @returns {Promise.<ApiResponse>}
     */
    async user_token(email, password) {
        let data = {
            'email': email,
            'password': password,
        }
        let response = await this.api._makeApiRequest('/v1/auth/user/token', 'POST', data);
        let result = this.api._prepareApiResponse(response, this._successUserResponse);
        this.api.setToken(result.token);
        return result;
    }

    /**
     * Authenticate application by public and private api keys and get JWT token.
     *
     * @method AuthEndpoints#application_token
     * @param {string} public_api_key Application's public api key
     * @param {string} private_api_key Application's private api key
     * @returns {Promise.<ApiResponse>}
     */
    async application_token(public_api_key, private_api_key) {
        let data = {
            'public_api_key': public_api_key,
            'private_api_key': private_api_key,
        }
        let response = await this.api._makeApiRequest('/v1/auth/application/token', 'POST', data);
        let result = this.api._prepareApiResponse(response, this._successApplicationResponse);
        this.api.setToken(result.token);
        return result;
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {User}
     * @private
     */
    _successUserResponse(api, response) {
        return new User(api, response.data);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {ApplicationToken}
     * @private
     */
    _successApplicationResponse(api, response) {
        return new ApplicationToken(api, response.data);
    }
}