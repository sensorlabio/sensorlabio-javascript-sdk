import SensorAlert from '../models/sensor_alert';

/**
 * Response with sensor alerts data
 */
export default class SensorAlertsResponse {
    /**
     * @constructor SensorAlertsResponse
     *
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * List of sensors.
         *
         * @member SensorAlertsResponse#
         * @type {SensorAlert[]}
         */
        this.sensor_alerts = [];

        let self = this;
        data.result.forEach(function(alert_data) {
            self.sensor_alerts.push(new SensorAlert(self.api, alert_data));
        });
    }
}