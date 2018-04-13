/**
 * User profile
 */
export default class Profile {
    constructor(api, data) {
        this.api = api;
        this.email = data.email;
    }

    /**
     * Change password for profile/user.
     *
     * @param old_password
     * @param new_password
     * @param new_password_check
     * @returns {Promise.<ApiResponse>}
     */
    async change_password(old_password, new_password, new_password_check) {
        return this.api.profile.change_password(old_password, new_password, new_password_check)
    }
}