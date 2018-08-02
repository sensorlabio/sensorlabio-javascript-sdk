import Application from '../models/application';

/**
 * Response with applications data
 */
export default class ApplicationsResponse {
    /**
     * @constructor ApplicationsResponse
     *
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * Total amount of pages available.
         *
         * @member ApplicationsResponse#pages
         * @type {number}
         */
        this.pages = data.pages;

        /**
         * Total amount of sensors available.
         *
         * @member ApplicationsResponse#count
         * @type {number}
         */
        this.count = data.count;

        /**
         * List of sensors.
         *
         * @member ApplicationsResponse#measurements
         * @type {Sensor[]}
         */
        this.applications = [];

        let self = this;
        data.result.forEach(function(application_data) {
            self.applications.push(new Application(self.api, application_data));
        });
    }
}