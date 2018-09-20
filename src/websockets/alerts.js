import BasicWebsocket from "./basic";

export default class SensorlabAlertsWebsocket extends BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/alerts';
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

        this.socket.on(this._getRoomName(sensor), cb);
    }

    offAlerts(sensor, cb) {
        if (this.socket) {
            this.socket.off(this._getRoomName(sensor), cb);
        }
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

    _getRoomName(sensor) {
        let room_name = 'alerts/' + sensor;
        return room_name;
    }
}