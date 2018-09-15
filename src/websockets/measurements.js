import BasicWebsocket from "./basic";

export default class SensorlabMeasurementsWebsocket extends BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/measurements';
    }

    setSensor(sensor, type = null) {
        this.socket.emit('sensor', { sensor: sensor, type: type});
    }

    onMeasurements(cb) {
        if (!this._checkConnection()) {
            return false;
        }
        this.socket.on('measurements', function(message) {
            cb(message);
        });
    }

    onAccessDenied(cb) {
        if (!this._checkConnection()) {
            return false;
        }
        this.socket.on('sensor/access_denied', function(message) {
            let params = JSON.parse(message);
            cb(params.sensor, params.message);
        });
    }
}