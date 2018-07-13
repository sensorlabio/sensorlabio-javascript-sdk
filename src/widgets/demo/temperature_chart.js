import React from 'react';
import ReactDOM from 'react-dom';
import DemoTemperatureChartWidgetComponent from "../../components/demo/DemoTemperatureChartWidgetComponent";

export default class DemoTemperatureChartWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<DemoTemperatureChartWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}