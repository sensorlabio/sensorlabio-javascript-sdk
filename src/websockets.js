import SensorlabMeasurementsWebsocket from "./websockets/measurements";
import SensorlabAlertsWebsocket from "./websockets/alerts";
import SensorlabPublicWebsocket from "./websockets/public";

export default class SensorlabWebsockets {
    constructor() {

        this.measurements = SensorlabMeasurementsWebsocket;

        this.alerts = SensorlabAlertsWebsocket;

        this.public = SensorlabPublicWebsocket;
    }
}