/**
 * @classdesc Class for /users/* endpoints.
 */
export default class UsersEndpoints {
    /**
     * @constructor UsersEndpoint
     * @param {SensorlabApi} api - parent API class
     */
    constructor(api) {
        /**
         * @member UsersEndpoint#api
         * @type {SensorlabApi}
         */
        this.api = api;
    }

    /**
     * Signup users endpoint.
     *
     * @method UsersEndpoint#signup
     * @param {string} email - users's email
     * @param {string} password - users's password
     * @param {string} password_check - password check field value
     */
    async signup(email, password, password_check) {
        let data = {
            'email': email,
            'password': password,
            'password_check': password_check,
        }
        let response = await this.api._makeApiRequest('/basic/users/signup', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Email verification endpoint.
     *
     * @method UsersEndpoint#verify_email
     * @param {string} verification_token - verification token from email
     * @returns {Promise.<ApiResponse>}
     */
    async verify_email(verification_token) {
        let data = {
            verification_token: verification_token,
        };
        let response = await this.api._makeApiRequest('/basic/users/verify_email', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset endpoint.
     *
     * @method UsersEndpoint#reset_password_request
     * @param {string} email - user's email
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password_request(email) {
        let data = {
            'email': email,
        }
        let response = await this.api._makeApiRequest('/basic/users/reset_password/request', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset check token endpoint.
     *
     * @method UsersEndpoint#reset_password_check_token
     * @param {string} token - verification token to check
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password_check_token(token) {
        let data = {
            'token': token,
        }
        let response = await this.api._makeApiRequest('/basic/users/reset_password/check', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Reset password endpoint.
     *
     * @method UsersEndpoint#reset_password
     * @param {string} token - verification token from email.
     * @param {string} password - new user's password
     * @param {string} password_check - password check field value
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password(token, password, password_check) {
        let data = {
            'token': token,
            'password': password,
            'password_check': password_check,
        }
        let response = await this.api._makeApiRequest('/basic/users/reset_password', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Resend verification email.
     *
     * @method UsersEndpoint#verify_email_resend
     * @param {string} email - user's email
     * @returns {Promise.<ApiResponse>}
     */
    async verify_email_resend(email) {
        let data = {
            'email': email,
        }
        let response = await this.api._makeApiRequest('/basic/users/verify_email/resend', 'POST', data);
        return this.api._prepareApiResponse(response);
    }
}