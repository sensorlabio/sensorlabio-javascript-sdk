import BasicWebsocket from "./basic";

export default class SensorlabMeasurementsWebsocket extends BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/measurements';
    }

    joinSensor(sensor, type = null) {
        this.socket.emit('sensor', { sensor: sensor, type: type});
    }

    leaveSensor(sensor, type = null) {
        this.socket.emit('sensor/disconnect', { sensor: sensor, type: type});
    }

    leaveAll() {
        this.socket.emit('sensor/disconnect/all');
    }

    onMeasurements(sensor, type = null, cb) {
        if (!this._checkConnection()) {
            return false;
        }

        this.socket.on(this._getRoomName(sensor, type), cb);
    }

    offMeasurements(sensor, type = null, cb) {
        if (this.socket) {
            this.socket.off(this._getRoomName(sensor, type), cb);
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

    _getRoomName(sensor, type) {
        let room_name = 'measurements/' + sensor;
        if (type) {
            room_name += '/' + type;
        }
        return room_name;
    }
}