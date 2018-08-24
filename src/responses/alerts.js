import Alert from '../models/alert';

/**
 * Response with alerts data
 */
export default class AlertsResponse {
    /**
     * @constructor AlertsResponse
     *
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * List of alerts.
         *
         * @member AlertsResponse#alerts
         * @type {Alert[]}
         */
        this.alerts = [];

        let self = this;
        data.forEach(function(alert_data) {
            self.alerts.push(new Alert(self.api, alert_data));
        });
    }
}