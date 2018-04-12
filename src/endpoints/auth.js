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
        return this.api._prepareApiResponse(response);
    }
}

module.exports = UsersEndpoint;