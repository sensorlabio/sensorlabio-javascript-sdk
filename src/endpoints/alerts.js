import AlertsResponse from '../responses/alerts';

/**
 * Get last alerts for sensor.
 */
export default class AlertsEndpoints {
    /**
     * @constructor AlertsEndpoints
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        /**
         * @member AlertsEndpoints#api
         * @type {SensorlabApi}
         */
        this.api = api;
    }

    /**
     * Get last alerts for sensor
     *
     * @method AlertsEndpoints#list
     * @param {string} sensor - Sensor ID.
     * @returns {Promise.<ApiResponse>}
     */
    async last(sensor) {
        let response = await this.api._makeApiRequest('/v1/sensors/'+sensor+'/alerts/last', 'GET');
        return this.api._prepareApiResponse(response, this._successAlertsListResponse);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {AlertsResponse}
     * @private
     */
    _successSensorListResponse(api, response) {
        return new AlertsResponse(api, response.data);
    }
}