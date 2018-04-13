import Sensor from '../models/sensor';

export default class SensorsResponse {
    constructor(api, data) {
        this.api = api;

        this.pages = data.pages;
        this.count = data.count;

        this.sensors = [];

        let self = this;
        data.result.forEach(function(sensor_data) {
            self.sensors.push(new Sensor(self.api, sensor_data));
        });
    }
}