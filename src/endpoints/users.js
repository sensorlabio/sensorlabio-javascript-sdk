/**
 * Class for /users/* endpoints.
 */
export default class UsersEndpoint {
    /**
     * @param api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Signup users endpoint.
     *
     * @param email
     * @param password
     * @param password_check
     */
    async signup(email, password, password_check) {
        let data = {
            'email': email,
            'password': password,
            'password_check': password_check,
        }
        let response = await this.api._makeApiRequest('/users/signup', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Email verification endpoint.
     *
     * @param verification_token
     * @returns {Promise.<ApiResponse>}
     */
    async verify_email(verification_token) {
        let data = {
            verification_token: verification_token,
        };
        let response = await this.api._makeApiRequest('/users/verify_email', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset endpoint.
     *
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password_request(email) {
        let data = {
            'email': email,
        }
        let response = await this.api._makeApiRequest('/users/reset_password/request', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset endpoint.
     *
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password_check_token(token) {
        let data = {
            'token': token,
        }
        let response = await this.api._makeApiRequest('/users/reset_password/check', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset endpoint.
     *
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password(token, password, password_check) {
        let data = {
            'token': token,
            'password': password,
            'password_check': password_check,
        }
        let response = await this.api._makeApiRequest('/users/reset_password', 'POST', data);
        return this.api._prepareApiResponse(response);
    }
}