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
     * @returns {Promise.<ApiResponse>}
     */
    async list(options) {
        if (options === undefined) options = {};
        if (options.page === undefined) options.page = 1;
        if (options.name === undefined) options.name = null;
        if (options.uniqueid === undefined) options.uniqueid = null;
        if (options.imei === undefined) options.imei = null;
        if (options.sort === undefined) options.sort = null;

        let params = {
            page: options.page,
            name: options.name,
            uniqueid: options.uniqueid,
            imei: options.imei,
            sort: options.sort,
        }
        let response = await this.api._makeApiRequest('/sensors', 'GET', {}, params, true);
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
        let response = await this.api._makeApiRequest('/sensors/' + sensor_id, 'GET', {}, {}, true);
        return this._prepareSensorResponse(response);
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
        if (response.status == 200) { //normal response
            return new SensorsResponse(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
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
        if (response.status == 200) { //normal response
            return new Sensor(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}