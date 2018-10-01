import BasicWebsocket from "./basic";

let io = require('socket.io-client');

export default class SensorlabPublicWebsocket extends BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/public';

        //we must force a new connection since because this namespace has different authentication method
        this.force_new = true;
    }

    async connect(public_api_key) {
        return new Promise((resolve, reject) => {
            //connect
            this.socket = io(this.url + this.namespace + '?public_api_key='+public_api_key, {
                path: '/ws',
                forceNew: this.force_new
            });

            //try to authenticate on connection
            this.socket.on('connect', () => {
                this._onConnected();
                resolve();
            });

            this.socket.on('error', function (reason){
                console.error('Unable to connect Socket.IO', reason);
            });

            //catch disconnect
            this.socket.on('disconnect', () => {
                this._onDisconnect();
            });
        });
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