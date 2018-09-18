import BasicWebsocket from "./basic";

export default class SensorlabAlertsWebsocket extends BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/alerts';

        this.callbacks = {};
    }

    joinSensor(sensor) {
        this.socket.emit('sensor', { sensor: sensor});
    }

    leaveSensor(sensor) {
        this.socket.emit('sensor/disconnect', { sensor: sensor });
    }

    leaveAll() {
        this.socket.emit('sensor/disconnect/all');
    }

    onAlerts(sensor, cb) {
        if (!this._checkConnection()) {
            return false;
        }

        let room_name = 'alerts/' + sensor;

        if (this.callbacks[room_name]) {
            this.socket.off(room_name, this.callbacks[room_name]);
        }

        this.callbacks[room_name] = cb;

        this.socket.on(room_name, this.callbacks[room_name]);
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