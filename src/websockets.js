let io = require('socket.io-client');

export default class SensorlabWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io/ws') {
        this.url = websocket_url;
        this.socket = null;

        this.is_connected = false;
        this.is_authenticated = false;
    }

    async connect(token, sensor) {
        return new Promise((resolve, reject) => {
            //connect
            this.socket = io.connect(this.url);

            //try to authenticate on connection
            this.socket.on('connect', () => {
                this._authenticate(token, sensor);
            });

            //catch authentication result
            this.socket.on('authenticated', (message) => {
                if (message.authenticated === true) {
                    this.is_authenticated = true;
                    this.is_connected = true;
                    resolve();
                } else {
                    reject('Cannot authenticate to websocket server');
                }
            });

            //catch disconnect
            this.socket.on('disconnect', () => {
                this._onDisconnect();
            });
        });
    }

    disconnect() {
        this.socket.disconnect();
    }

    onMeasurements(cb) {
        if (!this._checkConnection()) {
            return false;
        }
        this.socket.on('measurements', function(message) {
            cb(message);
        });
    }

    onAlerts(cb) {
        if (!this._checkConnection()) {
            return false;
        }
        this.socket.on('alerts', function(message) {
            cb(message);
        });
    }

    _authenticate(token, sensor) {
        this.socket.emit('authentication', {token: token, sensor: sensor});
    }

    _onDisconnect() {
        this.is_connected = false;
        this.is_authenticated = false;
    }

    _checkConnection() {
        if (this.is_authenticated && this.is_connected) {
            return true;
        }
        return false;
    }
}