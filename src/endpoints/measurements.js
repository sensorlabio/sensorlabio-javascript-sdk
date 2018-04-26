import ApiResponse from '../responses/api';
import MeasurementsResponse from '../responses/measurements';
import Measurment from '../models/measurement';

/**
 * Class for /measurements/* endpoints.
 */
export default class MeasurementsEndpoint {
    /**
     * @constructor MeasurementsEndpoint
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get sensors list
     *
     * @method MeasurementsEndpoint#list
     * @param {object} options - method options
     * @param {number} options.page - page number to display. Default is `1`.
     * @param {string} options.sensor_id - show measurements for sensor with specified id.
     * @param {string} options.type - get measurements with specified type only.
     * @param {string} options.sort - sorting parameter
     * @returns {Promise.<ApiResponse>}
     */
    async list(options) {
        if (options === undefined) options = {};
        if (options.sensor_id === undefined) options.sensor_id = null;
        if (options.type === undefined) options.type = null;
        if (options.page === undefined) options.page = 1;
        if (options.sort === undefined) options.sort = null;

        let params = {
            page: options.page,
            type: options.type,
            sensor_id: options.sensor_id,
            sort: options.sort,
        }
        let response = await this.api._makeApiRequest('/measurements', 'GET', {}, params, true);
        return this._prepareMeasurementsListResponse(response);
    }

    /**
     * Get sensor by id
     *
     * @method MeasurementsEndpoint#last
     * @param {object} options - method options
     * @param {string} options.sensor_id - get measurement for sensor with specified id.
     * @param {string} type - get measurement with specified type only.
     * @returns {Promise.<ApiResponse>}
     */
    async last(options) {
        if (options === undefined) options = {};
        if (options.sensor_id === undefined) options.sensor_id = null;
        if (options.type === undefined) options.type = null;

        let params = {};
        if (options.type) {
            params['type'] = options.type;
        }
        if (options.sensor_id) {
            params['sensor_id'] = options.sensor_id;
        }
        let response = await this.api._makeApiRequest('/measurements/last', 'GET', {}, params, true);
        return this._prepareMeasurementResponse(response);
    }

    /**
     * Return list of measurements (or error!).
     *
     * @param response
     * @returns {ApiResponse}
     * @throws {ApiResponse}
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
     * @returns {Measurement}
     * @throws ApiResponse
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