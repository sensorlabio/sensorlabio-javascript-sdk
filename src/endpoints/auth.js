var User = require('../models/user');

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
        return this._prepareApiResponse(response);
    }

    /**
     * Return response for auth/token
     *
     * @param response
     * @returns {ApiResponse}
     * @private
     */
    _prepareSensorResponse(response) {
        if (response.status == 200) { //normal response
            var user = new User(this.api, response.data);
            this.api.setToken(user.token);
            return user;
        } else if (response.status == 401) { //401 Unauthorized error
            return new ApiResponse(false, response.status, 0, response.data);
        } else {
            return new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = UsersEndpoint;