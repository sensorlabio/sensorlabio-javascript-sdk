import ApiResponse from '../responses/api';
import MeasurementsResponse from '../responses/measurements';
import Measurement from '../models/measurement';

/**
 * This endpoints are only available for https://api-demo.sensorlab.io/api
 *
 * @classdesc Demo endpoints.
 */
export default class DemoEndpoint {
    /**
     * @constructor DemoEndpoint
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Get last temperature for demo sensor.
     *
     * @method DemoEndpoint#temperature_last
     * @returns {Promise.<ApiResponse>}
     */
    async temperature_last() {
        let response = await this.api._makeApiRequest('/v1/demo/temperature/last', 'GET');
        return this._prepareMeasurementResponse(response);
    }

    /**
     * Get last 50 temperature measurements for demo sensor.
     *
     * @method DemoEndpoint#temperature_list
     * @returns {Promise.<ApiResponse>}
     */
    async temperature_list() {
        let response = await this.api._makeApiRequest('/v1/demo/temperature/list', 'GET');
        return this._prepareMeasurementsListResponse(response);
    }

    /**
     * Get last battery charge measurement for demo sensor.
     *
     * @method DemoEndpoint#battery_charge_last
     * @returns {Promise.<ApiResponse>}
     */
    async battery_charge_last() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/charge/last', 'GET');
        return this._prepareMeasurementResponse(response);
    }

    /**
     * Get last 50 battery charge measurements for demo sensor.
     *
     * @method DemoEndpoint#battery_charge_list
     * @returns {Promise.<ApiResponse>}
     */
    async battery_charge_list() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/charge/list', 'GET');
        return this._prepareMeasurementsListResponse(response);
    }

    /**
     * Get last battery voltage measurement for demo sensor.
     *
     * @method DemoEndpoint#battery_voltage_last
     * @returns {Promise.<ApiResponse>}
     */
    async battery_voltage_last() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/voltage/last', 'GET');
        return this._prepareMeasurementResponse(response);
    }

    /**
     * Get last 50 battery voltage measurements for demo sensor.
     *
     * @method DemoEndpoint#battery_voltage_list
     * @returns {Promise.<ApiResponse>}
     */
    async battery_voltage_list() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/voltage/list', 'GET');
        return this._prepareMeasurementsListResponse(response);
    }

    /**
     * Get last GPS coordinates for map widget.
     *
     * @method DemoEndpoint#map_last
     * @returns {Promise.<ApiResponse>}
     */
    async map_last() {
        let response = await this.api._makeApiRequest('/v1/demo/map/last', 'GET');
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
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        switch (response.status) {
            case 200:
                return new MeasurementsResponse(this.api, response.data);
                break;
            case 401:
                throw new ApiResponse(false, response.status, 0, response.data);
                break;
            case 422:
                throw new ApiResponse(response.data.success, response.status, response.data.code, response.data.message, response.data.errors);
                break;
            default:
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
        if (!response) {
            throw new ApiResponse(false, 0, 0, 'Connection refused');
        }
        if (response.status === 200) { //normal response
            return new Measurement(this.api, response.data);
        } else if (response.status === 401) { //401 Unauthorized error
            throw new ApiResponse(false, response.status, 0, response.data);
        } else {
            throw new ApiResponse(false, response.status, 0, response.data.message);
        }
    }
}