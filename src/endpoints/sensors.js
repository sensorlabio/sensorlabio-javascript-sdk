var ApiResponse = require('../responses/api');
var SensorsResponse = require('../responses/sensors');
var Sensor = require('../models/sensor');

/**
 * Class for /sensors/* endpoints.
 */
class SensorsEndpoint {
    /**
     * @param api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get sensors list
     *
     * @param page
     * @returns {Promise.<ApiResponse>}
     */
    async list(options) {
        if (options === undefined) options = {};
        if (options.page === undefined) options.page = 1;
        if (options.name === undefined) options.name = null;
        if (options.uniqueid === undefined) options.uniqueid = null;
        if (options.imei === undefined) options.imei = null;

        var params = {
            page: options.page,
            name: options.name,
            uniqueid: options.uniqueid,
            imei: options.imei,
        }
        var response = await this.api._makeApiRequest('/sensors', 'GET', {}, params, true);
        return this._prepareSensorListResponse(response);
    }

    /**
     * Get sensor by id
     *
     * @param sensor_id
     * @returns {Promise.<ApiResponse>}
     */
    async one(sensor_id) {
        var response = await this.api._makeApiRequest('/sensors/' + sensor_id, 'GET', {}, {}, true);
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
        if (response.status == 200) { //normal response
            return new Sensor(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = SensorsEndpoint;