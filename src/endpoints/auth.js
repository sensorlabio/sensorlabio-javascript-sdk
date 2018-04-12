var User = require('../models/user');
var ApiResponse = require('../responses/api');

/**
 * Class for /auth/* endpoints.
 */
class UsersEndpoint {
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
        var data = {
            'email': email,
            'password': password,
        }
        var response = await this.api._makeApiRequest('/auth/token', 'POST', data);
        let result = null;
        try {
             result = this._prepareApiResponse(response);
             this.api.setToken(result.token);
        } catch (e) {
            throw e;
        }
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
            return new ApiResponse(true, response.status, response.code, null, response.data.token);
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = UsersEndpoint;