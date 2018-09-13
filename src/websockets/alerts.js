import BasicWebsocket from "./basic";

export default class SensorlabAlertsWebsocket extends BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/alerts';
    }

    setSensor(sensor) {
        this.socket.emit('sensor', { sensor: sensor});
    }

    onAlerts(cb) {
        if (!this._checkConnection()) {
            return false;
        }
        this.socket.on('alerts', function(message) {
            cb(message);
        });
    }
}