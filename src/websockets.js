import SensorlabMeasurementsWebsocket from "./websockets/measurements";
import SensorlabAlertsWebsocket from "./websockets/alerts";
import SensorlabPublicWebsocket from "./websockets/public";

/**
 * Main external class with links to other classes
 */
export default class SensorlabWebsockets {
    /**
     * @constructor SensorlabWebsockets
     */
    constructor() {
        /**
         * Shortcut to SensorlabMeasurementsWebsocket class
         *
         * @member SensorlabWebsockets#measurements
         * @type {SensorlabMeasurementsWebsocket}
         */
        this.measurements = SensorlabMeasurementsWebsocket;

        /**
         * Shortcut to SensorlabAlertsWebsocket class
         *
         * @member SensorlabWebsockets#alerts
         * @type {SensorlabAlertsWebsocket}
         */
        this.alerts = SensorlabAlertsWebsocket;

        /**
         * Shortcut to SensorlabPublicWebsocket class
         *
         * @member SensorlabWebsockets#public
         * @type {SensorlabPublicWebsocket}
         */
        this.public = SensorlabPublicWebsocket;
    }
}