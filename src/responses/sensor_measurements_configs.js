import SensorMeasurementsConfig from '../models/sensor_measurements_config';

/**
 * Response with sensor measurements config data
 */
export default class SensorMeasurementsConfigsResponse {
    /**
     * @constructor SensorMeasurementsConfigsResponse
     *
     * @param {SensorlabApi} api - parent api
     * @param {Object} data - data from response
     */
    constructor(api, data) {
        this.api = api;

        /**
         * List of sensors.
         *
         * @member SensorMeasurementsConfigsResponse#measurementsConfigs
         * @type {SensorMeasurementsConfig[]}
         */
        this.measurementsConfigs = [];

        let self = this;
        data.forEach(function(measurements_config_data) {
            self.measurementsConfigs.push(new SensorMeasurementsConfig(self.api, measurements_config_data));
        });
    }
}
