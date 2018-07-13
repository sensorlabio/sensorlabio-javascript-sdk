import DemoThermometerWidget from './demo/thermometer';
import DemoTemperatureChartWidget from "./demo/temperature_chart";
import DemoBatteryChargeChartWidget from "./demo/battery_charge_chart";
import DemoBatteryChargeWidget from "./demo/battery_charge";

export default class DemoWidgets {
    constructor(api) {
        this.api = api;

        this.thermometer = new DemoThermometerWidget(api);
        this.temperature_chart = new DemoTemperatureChartWidget(api);
        this.battery_charge = new DemoBatteryChargeWidget(this.api);
        this.battery_charge_chart = new DemoBatteryChargeChartWidget(this.api);
    }
}