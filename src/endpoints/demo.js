import MeasurementsResponse from '../responses/measurements';
import Measurement from '../models/measurement';

/**
 * This endpoints are only available for https://api-demo.sensorlab.io/api
 *
 * @classdesc Demo endpoints.
 */
export default class DemoEndpoints {
    /**
     * @constructor DemoEndpoint
     * @param {SensorlabApi} api - parent api
     */
    constructor(api) {
        /**
         * @member DemoEndpoint#api
         * @type {SensorlabApi}
         */
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
        return this.api._prepareApiResponse(response, this._successMeasurementResponse);
    }

    /**
     * Get last 50 temperature measurements for demo sensor.
     *
     * @method DemoEndpoint#temperature_list
     * @returns {Promise.<ApiResponse>}
     */
    async temperature_list() {
        let response = await this.api._makeApiRequest('/v1/demo/temperature/list', 'GET');
        return this.api._prepareApiResponse(response, this._successMeasurementsListResponse);
    }

    /**
     * Get last battery charge measurement for demo sensor.
     *
     * @method DemoEndpoint#battery_charge_last
     * @returns {Promise.<ApiResponse>}
     */
    async battery_charge_last() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/charge/last', 'GET');
        return this.api._prepareApiResponse(response, this._successMeasurementResponse);
    }

    /**
     * Get last 50 battery charge measurements for demo sensor.
     *
     * @method DemoEndpoint#battery_charge_list
     * @returns {Promise.<ApiResponse>}
     */
    async battery_charge_list() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/charge/list', 'GET');
        return this.api._prepareApiResponse(response, this._successMeasurementsListResponse);
    }

    /**
     * Get last battery voltage measurement for demo sensor.
     *
     * @method DemoEndpoint#battery_voltage_last
     * @returns {Promise.<ApiResponse>}
     */
    async battery_voltage_last() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/voltage/last', 'GET');
        return this.api._prepareApiResponse(response, this._successMeasurementResponse);
    }

    /**
     * Get last 50 battery voltage measurements for demo sensor.
     *
     * @method DemoEndpoint#battery_voltage_list
     * @returns {Promise.<ApiResponse>}
     */
    async battery_voltage_list() {
        let response = await this.api._makeApiRequest('/v1/demo/battery/voltage/list', 'GET');
        return this.api._prepareApiResponse(response, this._successMeasurementsListResponse);
    }

    /**
     * Get last GPS coordinates for map widget.
     *
     * @method DemoEndpoint#map_last
     * @returns {Promise.<ApiResponse>}
     */
    async map_last() {
        let response = await this.api._makeApiRequest('/v1/demo/map/last', 'GET');
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