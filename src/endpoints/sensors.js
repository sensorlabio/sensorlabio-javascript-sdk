import ApiResponse from '../responses/api';
import SensorsResponse from '../responses/sensors';
import Sensor from '../models/sensor';

/**
 * Class for /sensors/* endpoints.
 */
export default class SensorsEndpoint {
    /**
     * @constructor SensorsEndpoint
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get sensors list.
     *
     * @method SensorsEndpoint#list
     * @param {object} options - method options
     * @param {number} options.page - page number to display. Default is `1`.
     * @param {string} options.name - filter by name.
     * @param {string} options.uniqueid - filter by uniqueid.
     * @param {string} options.imei - filter by imei.
     * @param {string} options.sort - sorting parameter
     * @param {string} options.online_status - pass "online" to search for online sensors or "offline" for offline sensors.
     * @param {string} options.battery_charge_min - filter sensors by battery charge
     * @param {string} options.battery_charge_max - filter sensors by battery charge
     * @returns {Promise.<ApiResponse>}
     */
    async list(options) {
        if (options === undefined) options = {};
        if (options.page === undefined) options.page = 1;
        if (options.name === undefined) options.name = null;
        if (options.uniqueid === undefined) options.uniqueid = null;
        if (options.imei === undefined) options.imei = null;
        if (options.sort === undefined) options.sort = null;
        if (options.online_status === undefined) options.online_status = null;
        if (options.battery_charge_min === undefined) options.battery_charge_min = null;
        if (options.battery_charge_max === undefined) options.battery_charge_max = null;

        let params = {
            page: options.page,
            name: options.name,
            uniqueid: options.uniqueid,
            imei: options.imei,
            sort: options.sort,
            online_status: options.online_status,
            battery_charge_min: options.battery_charge_min,
            battery_charge_max: options.battery_charge_max
        }
        let response = await this.api._makeApiRequest('/v1/sensors', 'GET', {}, params, true);
        return this._prepareSensorListResponse(response);
    }

    /**
     * Get sensor by id.
     *
     * @method SensorsEndpoint#one
     * @param {string} sensor_id - sensor's id
     * @returns {Promise.<ApiResponse>}
     */
    async one(sensor_id) {
        let response = await this.api._makeApiRequest('/v1/sensors/' + sensor_id, 'GET', {}, {}, true);
        return this._prepareSensorResponse(response);
    }

    /**
     * Update sensors.
     *
     * @method SensorsEndpoint#update
     * @param {string} sensor_id - id of sensor to update
     * @param {string} name - sensor's name
     * @param {string} application - application id to assign to
     */
    async update(sensor_id, name, application = null) {
        let data = {
            'name': name,
            'application': application,
        }
        let response = await this.api._makeApiRequest('/v1/sensors/' + sensor_id, 'PATCH', data);
        return this.api._prepareApiResponse(response);
    }

    /**
     * Return list of sensors (or error!)
     *
     * @param response
     * @returns {ApiResponse}
     * @private
     */
    _prepareSensorListResponse(response) {
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status === 200) { //normal response
            return new SensorsResponse(this.api, response.data);
        } else if (response.status === 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }

    /**
     * Return list of sensors (or error!)
     *
     * @param response
     * @returns {ApiResponse}
     * @private
     */
    _prepareSensorResponse(response) {
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status === 200) { //normal response
            return new Sensor(this.api, response.data);
        } else if (response.status === 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}