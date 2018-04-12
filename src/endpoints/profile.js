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
        let response = await this.api._makeApiRequest('/profile', 'GET', null, null, true);
        let result = null;
        try {
            result = this._prepareApiResponse(response);
        } catch (e) {
            throw e;
        }
        return result;

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
        let data = {
            'old_password': old_password,
            'new_password': new_password,
            'new_password_check': new_password_check,
        };
        let response = await this.api._makeApiRequest('/profile/change_password', 'POST', data, null, true);
        let result = null;
        try {
            result = this.api._prepareApiResponse(response);
        } catch (e) {
            throw e;
        }
        return result
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
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = ProfileEndpoint;