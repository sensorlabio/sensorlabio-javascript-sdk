var Sensor = require('../models/sensor');

class SensorsResponse {
    constructor(api, data) {
        this.api = api;

        this.pages = data.pages;
        this.count = data.count;

        this.sensors = [];

        var self = this;
        data.result.forEach(function(sensor_data) {
            self.sensors.push(new Sensor(self.api, sensor_data));
        });
    }
}

module.exports = SensorsResponse;