import ThermometerWidget from './widgets/thermometer';
import TemperatureChartWidget from "./widgets/temperature_chart";

export default class Widgets {
    constructor(api) {
        this.api = api;

        this.thermometer = new ThermometerWidget(this.api);
        this.temperature_chart = new TemperatureChartWidget(this.api);
    }
}