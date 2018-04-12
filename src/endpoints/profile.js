var ApiResponse = require('../responses/api');
var Profile = require('../models/profile');

/**
 * Class for /profile/* endpoints.
 */
class ProfileEndpoint {
    /**
     * @param api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get profile.
     *
     * @returns {Promise.<ApiResponse>}
     */
    async get() {
        var response = await this.api._makeApiRequest('/profile', 'GET', null, null, true);
        return this._prepareApiResponse(response);
    }

    /**
     * Change password.
     *
     * @param old_password
     * @param new_password
     * @param new_password_check
     * @returns {Promise.<ApiResponse>}
     */
    async change_password(old_password, new_password, new_password_check) {
        var data = {
            'old_password': old_password,
            'new_password': new_password,
            'new_password_check': new_password_check,
        };
        var response = await this.api._makeApiRequest('/profile/change_password', 'POST', data, null, true);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Create User response from axios result.
     *
     * @param response
     * @returns {ApiResponse}
     * @private
     */
    _prepareApiResponse(response) {
        if (response.status == 200) { //normal response
            return new Profile(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            return new ApiResponse(false, response.status, 0, response.data);
        } else {
            return new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = ProfileEndpoint;