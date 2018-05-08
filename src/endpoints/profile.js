import ApiResponse from '../responses/api';
import Profile from '../models/profile';

/**
 * Class for /profile/* endpoints.
 */
export default class ProfileEndpoint {
    /**
     * @constructor ProfileEndpoint
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get user's profile.
     *
     * @method ProfileEndpoint#get
     * @returns {Promise.<ApiResponse>}
     */
    async get() {
        let response = await this.api._makeApiRequest('/v1/profile', 'GET', null, null, true);
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
     * @method ProfileEndpoint#change_password
     * @param {string} old_password - current (old) user's password
     * @param {string} new_password - new password to set
     * @param {string} new_password_check - new password check
     * @returns {Promise.<ApiResponse>}
     */
    async change_password(old_password, new_password, new_password_check) {
        let data = {
            'old_password': old_password,
            'new_password': new_password,
            'new_password_check': new_password_check,
        };
        let response = await this.api._makeApiRequest('/v1/profile/change_password', 'POST', data, null, true);
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
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status == 200) { //normal response
            return new Profile(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}