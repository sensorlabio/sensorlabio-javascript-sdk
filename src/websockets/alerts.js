import BasicWebsocket from "./basic";

/**
 * Work with /alerts namespace.
 */
export default class SensorlabAlertsWebsocket extends BasicWebsocket {
    /**
     * @constructor SensorlabAlertsWebsocket
     *
     * @param {string} websocket_url socket.io url to connect to
     */
    constructor(websocket_url = 'http://staging.sensorlab.io') {
        super(websocket_url);
        this.namespace = '/alerts';
    }

    /**
     * Join room with alerts for specific sensor.
     * If user has access to the sensor - socket.io will start emitting data for this sensor.
     * If not - it will emit message that can be catched using onAccessDenied method.
     *
     * @member SensorlabAlertsWebsocket#joinSensor
     * @param {string} sensor sensor ID
     * @param {string} type measurement type
     */
    joinSensor(sensor) {
        this.socket.emit('sensor', { sensor: sensor});
    }

    /**
     * Leave room with alerts for specific sensor.
     *
     * @member SensorlabAlertsWebsocket#leaveSensor
     * @param {string} sensor sensor ID
     */
    leaveSensor(sensor) {
        this.socket.emit('sensor/disconnect', { sensor: sensor });
    }

    /**
     * Leave all rooms.
     *
     * @member SensorlabAlertsWebsocket#leaveAll
     */
    leaveAll() {
        this.socket.emit('sensor/disconnect/all');
    }

    /**
     * Listen to specific emitted alerts.
     *
     * @member SensorlabAlertsWebsocket#onAlerts
     * @param {string} sensor sensor ID
     * @param {callback} listener callback
     */
    onAlerts(sensor, cb) {
        if (!this._checkConnection()) {
            return false;
        }

        this.socket.on(this._getRoomName(sensor), cb);
    }

    /**
     * Disconnect listener.
     *
     * @member SensorlabAlertsWebsocket#offAlerts
     * @param {string} sensor sensor ID
     * @param {callback} connected callback
     */
    offAlerts(sensor, cb) {
        if (this.socket) {
            this.socket.off(this._getRoomName(sensor), cb);
        }
    }

    /**
     * This message will be emitted if your token doesn't have access to the sensor.
     *
     * @member SensorlabAlertsWebsocket#onAccessDenied
     * @param {callback} cb listener callback
     */
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