import MeasurementsResponse from '../responses/measurements';
import Measurement from '../models/measurement';

/**
 * Class for /measurements/* endpoints.
 */
export default class MeasurementsEndpoints {
    /**
     * @constructor MeasurementsEndpoints
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        /**
         * @member MeasurementsEndpoints#api
         * @type {SensorlabApi}
         */
        this.api = api;
    }

    /**
     * Get sensors list
     *
     * @method MeasurementsEndpoints#list
     * @param {object} options - method options
     * @param {number} options.page - page number to display. Default is `1`.
     * @param {string} options.sensor - show measurements for sensor with specified id.
     * @param {string} options.type - get measurements with specified type only.
     * @param {string} options.sort - sorting parameter
     * @returns {Promise.<ApiResponse>}
     */
    async list(options) {
        if (options === undefined) options = {};
        if (options.sensor === undefined) options.sensor = null;
        if (options.type === undefined) options.type = null;
        if (options.next === undefined) options.next = null;
        if (options.timestamp_start === undefined) options.timestamp_start = null;
        if (options.timestamp_stop === undefined) options.timestamp_stop = null;

        let params = {
            next: options.next,
            type: options.type,
            sensor: options.sensor,
            timestamp_start: options.timestamp_start,
            timestamp_stop: options.timestamp_stop,
        }
        let response = await this.api._makeApiRequest('/v1/measurements', 'GET', {}, params, true);
        return this.api._prepareApiResponse(response, this._successMeasurementsListResponse);
    }

    /**
     * Get sensor by id
     *
     * @method MeasurementsEndpoints#last
     * @param {object} options - method options
     * @param {string} options.sensor_id - get measurement for sensor with specified id.
     * @param {string} type - get measurement with specified type only.
     * @returns {Promise.<ApiResponse>}
     */
    async last(options) {
        if (options === undefined) options = {};
        if (options.sensor === undefined) options.sensor = null;
        if (options.type === undefined) options.type = null;

        let params = {};
        if (options.type) {
            params['type'] = options.type;
        }
        if (options.sensor) {
            params['sensor'] = options.sensor;
        }
        let response = await this.api._makeApiRequest('/v1/measurements/last', 'GET', {}, params, true);
        return this.api._prepareApiResponse(response, this._successMeasurementResponse);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {MeasurementsResponse}
     * @private
     */
    _successMeasurementsListResponse(api, response) {
        return new MeasurementsResponse(api, response.data);
    }

    /**
     * Return success result.
     *
     * @param {SensorlabApi} api
     * @param {object} response
     * @returns {Measurement}
     * @private
     */
    _successMeasurementResponse(api, response) {
        return new Measurement(api, response.data);
    }
}