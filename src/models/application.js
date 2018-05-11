/**
 * Application model
 */
export default class Application {
    /**
     * @constructor Application
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Application ID.
         *
         * @member Application#id
         * @type {string}
         */
        this.id = data.id;

        /**
         * Application name.
         *
         * @member Application#name
         * @type {string}
         */
        this.name = data.name;

        /**
         * Application name.
         *
         * @member Application#description
         * @type {string}
         */
        this.description = data.description;

        /**
         * Date/time created.
         *
         * @member Application#created
         * @type {*}
         */
        this.created = data.created;

        /**
         * Token for created application.
         *
         * @member Application#token
         * @type {string}
         */
        if ('token' in data) {
            this.token = data.token;
        } else {
            this.token = null;
        }


        let self = this;
    }
}