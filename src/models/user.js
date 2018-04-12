/**
 * User
 */
class User {
    constructor(api, data) {
        this.api = api;
        this.token = data.token;
    }
}

module.exports = User;