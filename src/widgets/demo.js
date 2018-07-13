import DemoThermometerWidget from './demo/thermometer';
import DemoTemperatureChartWidget from "./demo/temperature_chart";

export default class DemoWidgets {
    constructor(api) {
        this.api = api;

        this.thermometer = new DemoThermometerWidget(api);
        this.temperature_chart = new DemoTemperatureChartWidget(api);
    }
}