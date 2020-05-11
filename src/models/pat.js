/**
 * Pat (Personal Access Token) model
 */
export default class Pat {
    /**
     * @constructor Pat
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Genrated token.
         *
         * @member Pat#token
         * @type {object}
         */
        this.token = data.token;
    }
}
