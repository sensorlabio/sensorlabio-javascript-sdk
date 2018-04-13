/**
 * User model
 */
export default class User {
    constructor(api, data) {
        this.api = api;
        this.token = data.token;
    }
}