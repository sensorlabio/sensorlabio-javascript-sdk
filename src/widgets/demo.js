import DemoThermometerWidget from './demo/thermometer';
import DemoTemperatureChartWidget from "./demo/temperature_chart";
import DemoBatteryChargeWidget from "./demo/battery_charge";
import DemoBatteryChargeChartWidget from "./demo/battery_charge_chart";
import DemoBatteryVoltageWidget from "./demo/battery_voltage";
import DemoBatteryVoltageChartWidget from "./demo/battery_voltage_chart";
import DemoMapWidget from './demo/map';

export default class DemoWidgets {
    constructor(api) {
        this.api = api;

        this.thermometer = new DemoThermometerWidget(api);
        this.temperature_chart = new DemoTemperatureChartWidget(api);
        this.battery_charge = new DemoBatteryChargeWidget(this.api);
        this.battery_charge_chart = new DemoBatteryChargeChartWidget(this.api);
        this.battery_voltage = new DemoBatteryVoltageWidget(this.api);
        this.battery_voltage_chart = new DemoBatteryVoltageChartWidget(this.api);
        this.map = new DemoMapWidget(this.api);
    }
}