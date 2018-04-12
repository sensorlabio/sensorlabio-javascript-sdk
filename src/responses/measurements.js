var Measurement = require('../models/measurement');

class MeasurementsResponse {
    constructor(api, data) {
        this.api = api;

        this.pages = data.pages;
        this.count = data.count;

        this.measurements = [];

        var self = this;
        data.result.forEach(function(measurement_data) {
            self.measurements.push(new Measurement(self.api, measurement_data));
        });
    }
}

module.exports = MeasurementsResponse;