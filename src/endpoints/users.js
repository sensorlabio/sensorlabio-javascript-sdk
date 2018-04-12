/**
 * Class for /users/* endpoints.
 */
class UsersEndpoint {
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
        var data = {
            'email': email,
            'password': password,
            'password_check': password_check,
        }
        var response = await this.api._makeApiRequest('/users/signup', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Email verification endpoint.
     *
     * @param verification_token
     * @returns {Promise.<ApiResponse>}
     */
    async verify_email(verification_token) {
        var data = {
            verification_token: verification_token,
        };
        var response = await this.api._makeApiRequest('/users/verify_email', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset endpoint.
     *
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password_request(email) {
        var data = {
            'email': email,
        }
        var response = await this.api._makeApiRequest('/users/reset_password/request', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset endpoint.
     *
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password_check_token(token) {
        var data = {
            'token': token,
        }
        var response = await this.api._makeApiRequest('/users/reset_password/check', 'POST', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Request password reset endpoint.
     *
     * @returns {Promise.<ApiResponse>}
     */
    async reset_password(token, password, password_check) {
        var data = {
            'token': token,
            'password': password,
            'password_check': password_check,
        }
        var response = await this.api._makeApiRequest('/users/reset_password', 'POST', data);
        return this.api._prepareApiResponse(response);
    }
}

module.exports = UsersEndpoint;