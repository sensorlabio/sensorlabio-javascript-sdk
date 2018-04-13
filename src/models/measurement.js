export default class Measurement {
    constructor(api, data) {
        this.api = api;

        this.id = data.id;
        this.sensor_id = data.sensor;
        this.type = data.type;
        this.value = data.value;
        this.recieved = data.recieved;
        this.created = data.created;
        this.measurementgroup = data.measurementgroup;
    }

    /**
     * Get sensor information
     *
     * @returns {Promise.<ApiResponse>}
     */
    async sensor() {
        return this.api.sensors.one(this.sensor_id);
    }
}