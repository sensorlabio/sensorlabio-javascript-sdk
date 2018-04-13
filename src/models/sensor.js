/**
 * Sensor model
 */
export default class Sensor {
    constructor(api, data) {
        this.api = api;

        this.id = data.id;
        this.uniqueid = data.uniqueid;
        this.imei = data.imei;
        this.name = data.name;

        let self = this;
        this.measurements = {
            'list': function(options) {
                return self.api.measurements.list(options);
            },
            'last': function(options) {
                return self.api.measurements.last(options);
            }
        }

    }
}