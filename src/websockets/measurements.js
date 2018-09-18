import BasicWebsocket from "./basic";

export default class SensorlabMeasurementsWebsocket extends BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/measurements';

        this.callbacks = {};
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
        let room_name = 'measurements/' + sensor;
        if (type) {
            room_name += '/' + type;
        }

        if (this.callbacks[room_name]) {
            this.socket.off(this.callbacks[room_name]);
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