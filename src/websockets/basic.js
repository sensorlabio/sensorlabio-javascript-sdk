import io from 'socket.io-client/dist/socket.io.slim';

/**
 * Basic websockets class
 */
export default class BasicWebsocket {
    /**
     * @constructor BasicWebsocket
     *
     * @param {string} websocket_url websockets url to connect to
     */
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        this.url = websocket_url;
        this.socket = null;

        this.is_connected = false;
        this.is_authenticated = false;
        this.namespace = '/';

        this.force_new = false;
    }

    /**
     * Connect to websocket namespace with authentication token.
     * Promise will resolve if connection is established and reject is there are problems with connection
     * or authentication
     *
     * @member BasicWebsocket#connect
     * @param {string} token
     * @returns {Promise}
     */
    async connect(token) {
        return new Promise((resolve, reject) => {
            //connect
            this.socket = io(this.url + this.namespace + '?token='+token, {
                path: '/ws',
                forceNew: this.force_new
            });

            //try to authenticate on connection
            this.socket.on('connect', () => {
                this._onConnected();
                resolve();
            });

            this.socket.on('connect_error', () => {
                reject({code: 0, message: 'Connection error'});
            });

            this.socket.on('error', function (reason) {
                reject(JSON.parse(reason));
                //console.error('Unable to connect Socket.IO', reason);
            });

            //catch disconnect
            this.socket.on('disconnect', () => {
                this._onDisconnect();
            });
        });
    }

    /**
     * Disconnect from websocket
     *
     * @member BasicWebsocket#disconnect
     */
    disconnect() {
        if (!this._checkConnection()) {
            return false;
        }
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