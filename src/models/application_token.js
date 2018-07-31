/**
 * Application Token class
 */
export default class ApplicationToken {
    /**
     * @constructor ApplicationToken
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Authorization token.
         *
         * @member ApplicationToken#token
         * @type {string}
         */
        this.token = data.token;
    }
}