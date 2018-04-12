class Sensor {
    constructor(api, data) {
        this.api = api;

        this.id = data.id;
        this.uniqueid = data.uniqueid;
        this.imei = data.imei;
        this.name = data.name;

        var self = this;
        this.measurements = {
            'list': function(type) {
                return self.api.measurements.list(self.id, type);
            },
            'last': function(type) {
                return self.api.measurements.last(self.id, type);
            }
        }

    }
}

module.exports = Sensor;