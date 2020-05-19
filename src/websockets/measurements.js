import BasicWebsocket from "./basic";

/**
 * Work with /measurements namespace.
 */
export default class SensorlabMeasurementsWebsocket extends BasicWebsocket {
  /**
   * @constructor SensorlabMeasurementsWebsocket
   *
   * @param {string} websocket_url socket.io url to connect to
   */
  constructor(websocket_url = 'http://staging.sensorlab.io') {
    super(websocket_url);
    this.namespace = '/measurements';
  }

  /**
   * Join room with measurement for specific sensor. You can also specify measurement type to listen too.
   * If user has access to the sensor - socket.io will start emitting data for this sensor.
   * If not - it will emit message that can be catched using onAccessDenied method.
   *
   * @member SensorlabMeasurementsWebsocket#joinSensor
   * @param {string} sensor sensor ID
   * @param {string} type measurement type
   * @param {boolean} min get min values for measurement type
   * @param {boolean} max get max values for measurement type
   */
  joinSensor(sensor, type = null, min = false, max = false) {
    this.socket.emit('sensor', {sensor: sensor, type: type, min: min, max: max});
  }

  /**
   * Leave room with measurements for specific sensor.
   *
   * @member SensorlabMeasurementsWebsocket#leaveSensor
   * @param {string} sensor sensor ID
   * @param {string} type measurement type
   */
  leaveSensor(sensor, type = null) {
    this.socket.emit('sensor/disconnect', {sensor: sensor, type: type});
  }

  /**
   * Leave all rooms.
   *
   * @member SensorlabMeasurementsWebsocket#leaveAll
   */
  leaveAll() {
    this.socket.emit('sensor/disconnect/all');
  }

  /**
   * Listen to specific emitted measurements.
   *
   * @member SensorlabMeasurementsWebsocket#onMeasurements
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
   * Listen to min emitted measurements.
   *
   * @member SensorlabMeasurementsWebsocket#onMeasurements
   * @param {string} sensor sensor ID
   * @param {string} type measurement type
   * @param {callback} listener callback
   */
  onMeasurementsMin(sensor, type = null, cb) {
    if (!this._checkConnection()) {
      return false;
    }

    this.socket.on(this._getRoomName(sensor, type, true), cb);
  }

  /**
   * Listen to max emitted measurements.
   *
   * @member SensorlabMeasurementsWebsocket#onMeasurements
   * @param {string} sensor sensor ID
   * @param {string} type measurement type
   * @param {callback} listener callback
   */
  onMeasurementsMax(sensor, type = null, cb) {
    if (!this._checkConnection()) {
      return false;
    }

    this.socket.on(this._getRoomName(sensor, type, false, true), cb);
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
    this.socket.on('sensor/access_denied', function (params) {
      cb(params.sensor, params.message);
    });
  }

  _getRoomName(sensor, type, min = false, max = false) {
    let room_name = 'measurements/' + sensor;
    if (type) {
      room_name += '/' + type;
      if (min && !max) {
        room_name += '/min'
      }
      if (!min && max) {
        room_name += '/max'
      }
    }
    return room_name;
  }
}
