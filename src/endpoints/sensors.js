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
    async list(page = 1, name = null, uniqueid = null, imei = null) {
        var params = {
            page: page,
            name: name,
            uniqueid: uniqueid,
            imei: imei,
        }
        var response = await this.api._makeApiRequest('/sensors', 'GET', {}, params, true);
        let result = null;
        try {
            result = this._prepareSensorListResponse(response);
        } catch (e) {
            throw e;
        }
        return result;
    }

    /**
     * Get sensor by id
     *
     * @param sensor_id
     * @returns {Promise.<ApiResponse>}
     */
    async one(sensor_id) {
        var response = await this.api._makeApiRequest('/sensors/' + sensor_id, 'GET', {}, {}, true);
        let result = null;
        try {
            result = this._prepareSensorResponse(response);
        } catch (e) {
            throw e;
        }
        return result;
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