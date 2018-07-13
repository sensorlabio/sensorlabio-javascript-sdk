import ThermometerWidget from './widgets/thermometer';
import TemperatureChartWidget from "./widgets/temperature_chart";
import BatteryChargeWidget from "./widgets/battery_charge";
import BatteryChargeChartWidget from "./widgets/battery_charge_chart";

export default class Widgets {
    constructor(api) {
        this.api = api;

        this.thermometer = new ThermometerWidget(this.api);
        this.temperature_chart = new TemperatureChartWidget(this.api);
        this.battery_charge = new BatteryChargeWidget(this.api);
        this.battery_charge_chart = new BatteryChargeChartWidget(this.api);
    }
}