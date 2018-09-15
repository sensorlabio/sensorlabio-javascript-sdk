let io = require('socket.io-client');

export default class BasicWebsocket {
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        this.url = websocket_url;
        this.socket = null;

        this.is_connected = false;
        this.is_authenticated = false;
        this.namespace = '/';
    }

    async connect(token) {
        return new Promise((resolve, reject) => {
            //connect
            console.log(this.url + this.namespace + '?token='+token);
            this.socket = io(this.url + this.namespace + '?token='+token, {
                path: '/ws'
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

    disconnect() {
        this.socket.disconnect();
    }

    _onConnected() {
        this.is_connected = true;
        this.is_authenticated = true;
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