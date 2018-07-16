import DemoThermometerWidget from './demo/thermometer';
import DemoTemperatureChartWidget from "./demo/temperature_chart";
import DemoBatteryChargeWidget from "./demo/battery_charge";
import DemoBatteryChargeChartWidget from "./demo/battery_charge_chart";
import DemoBatteryVoltageWidget from "./demo/battery_voltage";
import DemoBatteryVoltageChartWidget from "./demo/battery_voltage_chart";
import DemoMapWidget from './demo/map';

/**
 * Demo widgets for demo.sensorlab.io
 */
export default class DemoWidgets {
    /**
     * @constructor DemoWidgets
     *
     * @param api SensorlabApi
     */
    constructor(api) {
        /**
         * API.
         *
         * @member Widgets#api
         * @type {SensorlabAPI}
         */
        this.api = api;

        /**
         * Thermometer widget.
         *
         * @member DemoWidgets#thermometer
         * @type {DemoThermometerWidget}
         */
        this.thermometer = new DemoThermometerWidget(api);

        /**
         * Demo temperature chart widget.
         *
         * @member Widgets#temperature_chart
         * @type {DemoTemperatureChartWidget}
         */
        this.temperature_chart = new DemoTemperatureChartWidget(api);

        /**
         * Demo battery charge widget.
         *
         * @member DemoWidgets#battery_charge
         * @type {DemoBatteryChargeWidget}
         */
        this.battery_charge = new DemoBatteryChargeWidget(this.api);

        /**
         * Demo battery charge chart widget.
         *
         * @member DemoWidgets#battery_charge_chart
         * @type {BatteryChargeChartWidget}
         */
        this.battery_charge_chart = new DemoBatteryChargeChartWidget(this.api);

        /**
         * Demo battery voltage widget.
         *
         * @member DemoWidgets#battery_voltage
         * @type {DemoBatteryVoltageWidget}
         */
        this.battery_voltage = new DemoBatteryVoltageWidget(this.api);

        /**
         * Demo battery voltage chart widget.
         *
         * @member DemoWidgets#battery_voltage_chart
         * @type {BatteryVoltageChartWidget}
         */
        this.battery_voltage_chart = new DemoBatteryVoltageChartWidget(this.api);

        /**
         * Demo map widgets.
         *
         * @member DemoWidgets#map
         * @type {DemoMapWidget}
         */
        this.map = new DemoMapWidget(this.api);
    }
}