import React from 'react';
import ReactDOM from 'react-dom';
import TemperatureChartWidgetComponent from "../../components/TemperatureChartWidgetComponent";

export default class TemperatureChartWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<TemperatureChartWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}