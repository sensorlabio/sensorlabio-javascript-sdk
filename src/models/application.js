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
         * Public api key for application.
         *
         * @member Application#public_api_key
         * @type {string}
         */
        this.public_api_key = data.public_api_key;

        /**
         * Private Api Key for created application.
         *
         * @member Application#private_api_key
         * @type {string}
         */
        if ('private_api_key' in data) {
            this.private_api_key = data.private_api_key;
        }
    }
}