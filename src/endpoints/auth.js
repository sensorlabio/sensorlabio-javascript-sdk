import User from '../models/user';
import ApiResponse from '../responses/api';

/**
 * Class for /auth/* endpoints.
 */
export default class UsersEndpoint {
    /**
     * @param api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get authentication token.
     *
     * @param email
     * @param password
     * @returns {Promise.<ApiResponse>}
     */
    async token(email, password) {
        let data = {
            'email': email,
            'password': password,
        }
        let response = await this.api._makeApiRequest('/auth/token', 'POST', data);
        let result = this._prepareApiResponse(response);
        this.api.setToken(result.token);
        return result;
    }

    /**
     * Return ApiResponse or throw it
     *
     * @param response
     * @returns {ApiResponse}
     * @private
     */
    _prepareApiResponse(response) {
        if (response.status == 200) { //normal response
            return new User(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}