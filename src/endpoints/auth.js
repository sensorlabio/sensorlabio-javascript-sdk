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
    async token(email, password) {
        let data = {
            'email': email,
            'password': password,
        }
        let response = await this.api._makeApiRequest('/v1/auth/token', 'POST', data);
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
        if (response.status == 200) { //normal response
            return new User(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            if ('code' in response) {
                throw new ApiResponse(false, response.status, response.code, response.data.message);
            } else {
                throw new ApiResponse(false, response.status, 0, response.data);
            }
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}