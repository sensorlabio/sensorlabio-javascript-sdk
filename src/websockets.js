import SensorlabMeasurementsWebsocket from "./websockets/measurements";
import SensorlabAlertsWebsocket from "./websockets/alerts";

export default class SensorlabWebsockets {
    constructor() {

        this.measurements = SensorlabMeasurementsWebsocket;

        this.alerts = SensorlabAlertsWebsocket;
    }
}