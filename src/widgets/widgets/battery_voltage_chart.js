import React from 'react';
import ReactDOM from 'react-dom';
import BatteryVoltageChartWidgetComponent from '../../components/BatteryVoltageChartWidgetComponent';

export default class BatteryVoltageChartWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryVoltageChartWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}