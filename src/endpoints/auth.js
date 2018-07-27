import User from '../models/user';
import ApiResponse from '../responses/api';

/**
 * Class for /auth/* endpoints.
 */
export default class AuthEndpoint {
    /**
     * @constructor AuthEndpoint
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Authorize with email and password and get authentication token.
     *
     * @method AuthEndpoint#token
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
        let result = this._prepareApiResponse(response);
        this.api.setToken(result.token);
        return result;
    }

    /**
     * Authenticate application by public and private api keys and get JWT token.
     *
     * @method AuthEndpoint#token
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
        let result = this._prepareApiResponse(response);
        this.api.setToken(result.token);
        return result;
    }


    /**
     * Return ApiResponse or throw it
     *
     * @method AuthEndpoint#_prepareApiResponse
     * @param response
     * @returns {User}
     * @throws {ApiResponse}
     * @private
     */
    _prepareApiResponse(response) {
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status === 200) { //normal response
            return new User(this.api, response.data);
        } else if (response.status === 401) { //401 Unauthorized error
            if (response.data === 'Unauthorized') {
                throw new ApiResponse(false, response.status, 0, response.data);
            } else {
                throw new ApiResponse(false, response.status, response.data.code, response.data.message);
            }
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}