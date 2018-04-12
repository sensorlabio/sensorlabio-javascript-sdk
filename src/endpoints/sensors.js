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
    async list(page = 1) {
        var params = {
            page: page,
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
            return new ApiResponse(false, response.status, 0, response.data);
        } else {
            return new ApiResponse(false, response.status, 0, response.data.message);
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
            return new ApiResponse(false, response.status, 0, response.data);
        } else {
            return new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = SensorsEndpoint;