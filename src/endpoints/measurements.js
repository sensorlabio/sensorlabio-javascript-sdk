var ApiResponse = require('../responses/api');
var MeasurementsResponse = require('../responses/measurements');
var Measurment = require('../models/measurement');

/**
 * Class for /measurements/* endpoints.
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
    async list(sensor_id = null, type = null, page = 1) {
        var params = {
            page: page,
        }
        if (type) {
            params['type'] = type;
        }
        if (sensor_id) {
            params['sensor_id'] = sensor_id;
        }
        var response = await this.api._makeApiRequest('/measurements', 'GET', {}, params, true);
        return this._prepareMeasurementsListResponse(response);
    }

    /**
     * Get sensor by id
     *
     * @param sensor_id
     * @returns {Promise.<ApiResponse>}
     */
    async last(sensor_id = null, type = null) {
        var params = {};
        if (type) {
            params['type'] = type;
        }
        if (sensor_id) {
            params['sensor_id'] = sensor_id;
        }
        var response = await this.api._makeApiRequest('/measurements/last', 'GET', {}, params, true);
        return this._prepareMeasurementResponse(response);
    }

    /**
     * Return list of measurements (or error!).
     *
     * @param response
     * @returns {ApiResponse}
     * @private
     */
    _prepareMeasurementsListResponse(response) {
        if (response.status == 200) { //normal response
            return new MeasurementsResponse(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            return new ApiResponse(false, response.status, 0, response.data);
        } else {
            return new ApiResponse(false, response.status, 0, response.data.message);
        }
    }

    /**
     * Return measurement response
     *
     * @param response
     * @returns {*}
     * @private
     */
    _prepareMeasurementResponse(response) {
        if (response.status == 200) { //normal response
            return new Measurment(this.api, response.data);
        } else if (response.status == 401) { //401 Unauthorized error
            return new ApiResponse(false, response.status, 0, response.data);
        } else {
            return new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = SensorsEndpoint;