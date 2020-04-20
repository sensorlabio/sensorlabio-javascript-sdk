/**
 * User profile
 */
export default class Profile {
    /**
     * @constructor Profile
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * User's email
         *
         * @member Profile#email
         * @type {string}
         */
        this.email = data.email;

      /**
       * Is Application Admin or not
       *
       * @member Profile#isApplicationAdmin
       * @type {Boolean}
       */
        this.isApplicationAdmin = data.isApplicationAdmin;
    }

    /**
     * Change password for profile/user.
     *
     * @method Profile#change_password
     * @param old_password
     * @param new_password
     * @param new_password_check
     * @returns {Promise.<ApiResponse>}
     */
    async change_password(old_password, new_password, new_password_check) {
        return this.api.profile.change_password(old_password, new_password, new_password_check)
    }
}
