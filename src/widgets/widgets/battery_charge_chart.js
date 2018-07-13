import React from 'react';
import ReactDOM from 'react-dom';
import BatteryChargeChartWidgetComponent from '../../components/BatteryChargeChartWidgetComponent';

export default class BatteryChargeChartWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryChargeChartWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}