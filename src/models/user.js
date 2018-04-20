/**
 * User model
 */
export default class User {
    /**
     * @constructor User
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Authorization token.
         *
         * @member User#token
         * @type {string}
         */
        this.token = data.token;
    }

    /**
     * Get user's profile.
     *
     * @method User#profile
     * @returns {Promise.<ApiResponse>}
     */
    profile() {
        return this.api.profile.get();
    }
}