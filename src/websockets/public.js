import BasicWebsocket from "./basic";

let io = require('socket.io-client');

/**
 * Work with /public namespace.
 */
export default class SensorlabPublicWebsocket extends BasicWebsocket {
    /**
     * @constructor SensorlabPublicWebsocket
     *
     * @param {string} websocket_url socket.io url to connect to
     */
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/public';

        //we must force a new connection since because this namespace has different authentication method
        this.force_new = true;
    }

    /**
     * Connect to websocket namespace with public api key token.
     * Promise will resolve if connection is established and reject is there are problems with connection
     * or authentication
     *
     * @member SensorlabPublicWebsocket#connect
     * @param {string} public_api_key Public Api Key
     * @returns {Promise}
     */
    async connect(public_api_key) {
        return new Promise((resolve, reject) => {
            //connect
            this.socket = io(this.url + this.namespace + '?public_api_key='+public_api_key, {
                path: '/ws',
                forceNew: this.force_new,
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
     * Join room with measurement for specific sensor. You can also specify measurement type to listen too.
     * If user has access to the sensor - socket.io will start emitting data for this sensor.
     * If not - it will emit message that can be catched using onAccessDenied method.
     *
     * @member SensorlabPublicWebsocket#joinSensor
     * @param {string} sensor sensor ID
     * @param {string} type measurement type
     */
    joinSensor(sensor, type = null) {
        this.socket.emit('sensor', { sensor: sensor, type: type});
    }

    /**
     * Leave room with measurements for specific sensor.
     *
     * @member SensorlabPublicWebsocket#leaveSensor
     * @param {string} sensor sensor ID
     * @param {string} type measurement type
     */
    leaveSensor(sensor, type = null) {
        this.socket.emit('sensor/disconnect', { sensor: sensor, type: type});
    }

    /**
     * Leave all rooms.
     *
     * @member SensorlabPublicWebsocket#leaveAll
     */
    leaveAll() {
        this.socket.emit('sensor/disconnect/all');
    }

    /**
     * Listen to specific emitted measurements.
     *
     * @member SensorlabPublicWebsocket#onMeasurements
     * @param {string} sensor sensor ID
     * @param {string} type measurement type
     * @param {callback} listener callback
     */
    onMeasurements(sensor, type = null, cb) {
        if (!this._checkConnection()) {
            return false;
        }

        this.socket.on(this._getRoomName(sensor, type), cb);
    }

    /**
     * Disconnect listener.
     *
     * @member SensorlabMeasurementsWebsocket#offMeasurements
     * @param {string} sensor sensor ID
     * @param {string} type measurement type
     * @param {callback} connected callback
     */
    offMeasurements(sensor, type = null, cb = null) {
        if (this.socket) {
            this.socket.off(this._getRoomName(sensor, type), cb);
        }
    }

    /**
     * This message will be emitted if your token doesn't have access to the sensor.
     *
     * @member SensorlabMeasurementsWebsocket#onAccessDenied
     * @param {callback} cb listener callback
     */
    onAccessDenied(cb) {
        if (!this._checkConnection()) {
            return false;
        }
        this.socket.on('sensor/access_denied', function(params) {
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