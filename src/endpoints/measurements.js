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
    async list(options) {
        if (options === undefined) options = {};
        if (options.sensor_id === undefined) options.sensor_id = null;
        if (options.type === undefined) options.type = null;
        if (options.page === undefined) options.page = 1;

        var params = {
            page: options.page,
        }
        if (options.type) {
            params['type'] = options.type;
        }
        if (options.sensor_id) {
            params['sensor_id'] = options.sensor_id;
        }
        let response = await this.api._makeApiRequest('/measurements', 'GET', {}, params, true);
        return this._prepareMeasurementsListResponse(response);
    }

    /**
     * Get sensor by id
     *
     * @param sensor_id
     * @returns {Promise.<ApiResponse>}
     */
    async last(options) {
        if (options === undefined) options = {};
        if (options.sensor_id === undefined) options.sensor_id = null;
        if (options.type === undefined) options.type = null;

        var params = {};
        if (type) {
            options['type'] = type;
        }
        if (sensor_id) {
            options['sensor_id'] = sensor_id;
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
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
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
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}

module.exports = SensorsEndpoint;