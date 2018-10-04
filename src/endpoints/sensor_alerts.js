import SensorAlertsResponse from '../responses/sensor_alerts';
import SensorAlert from '../models/sensor_alert';

/**
 * Sensor alerts endpoints.
 */
export default class SensorAlertsEndpoints {
    /**
     * @constructor SensorAlertsEndpoints
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        /**
         * @member SensorAlertsEndpoints#api
         * @type {SensorlabApi}
         */
        this.api = api;
    }

    /**
     * Get sensor alerts list
     *
     * @method SensorAlertsEndpoints#list
     * @param {string} sensor - Sensor ID.
     * @returns {Promise.<ApiResponse>}
     */
    async list(sensor) {
        let response = await this.api._makeApiRequest('/v1/sensors/'+sensor+'/alerts', 'GET');
        return this.api._prepareApiResponse(response, this._successSensorAlertsListResponse);
    }

    /**
     * Get sensor alert by id
     *
     * @method SensorAlertsEndpoints#get
     * @param {string} sensor - Sensor ID
     * @param {string} alert - Sensor Alert ID
     * @returns {Promise.<ApiResponse>}
     */
    async get(sensor, alert) {
        let response = await this.api._makeApiRequest('/v1/sensors/'+sensor+'/alerts/'+alert, 'GET');
        return this.api._prepareApiResponse(response, this._successSensorAlertResponse);
    }

    /**
     * Create sensor alert.
     *
     * @method SensorAlertsEndpoints#create
     * @param {string} threshold_type - Threshold type
     * @param {string} measurement_type - Measurement type
     * @param {mixed} threshold_value - Threshold value
     */
    async create(sensor, threshold_type, measurement_type, threshold_value) {
        let data = {
            threshold_type: threshold_type,
            measurement_type: measurement_type,
            threshold_value: threshold_value
        };
        let response = await this.api._makeApiRequest('/v1/sensors/'+sensor+'/alerts', 'POST', data);
        return this.api._prepareApiResponse(response, this._successCreateSensorAlertResponse);
    }

    /**
     * Update sensor alert.
     *
     * @method SensorAlertsEndpoints#update
     * @param {string} sensor - Sensor ID
     * @param {string} alert - Sensor Alert ID
     * @param {string} threshold_type - Threshold type
     * @param {string} measurement_type - Measurement type
     * @param {string|number|Object} threshold_value - Threshold value
     */
    async update(sensor, alert, threshold_type, measurement_type, threshold_value) {
        let data = {
            threshold_type: threshold_type,
            measurement_type: measurement_type,
            threshold_value: threshold_value
        };
        let response = await this.api._makeApiRequest('/v1/sensors/'+sensor+'/alerts/'+alert, 'PATCH', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Delete sensor alert.
     *
     * @method SensorAlertsEndpoints#delete
     * @param {string} sensor - Sensor ID
     * @param {string} alert - Sensor Alert ID
     * @returns {Promise.<ApiResponse>}
     */
    async delete(sensor, alert) {
        let response = await this.api._makeApiRequest('/v1/sensors/'+sensor+'/alerts/'+alert, 'DELETE');
        return this.api._prepareApiResponse(response);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {SensorAlertsResponse}
     * @private
     */
    _successSensorAlertsListResponse(api, response) {
        return new SensorAlertsResponse(api, response.data);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {SensorAlert}
     * @private
     */
    _successSensorAlertResponse(api, response) {
        return new SensorAlert(api, response.data);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {SensorAlert}
     * @private
     */
    _successCreateSensorAlertResponse(api, response) {
        return new SensorAlert(api, response.data.sensor_alert);
    }
}