import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryVoltageChartWidgetComponent from '../../components/demo/DemoBatteryVoltageChartWidgetComponent';

export default class BatteryVoltageChartWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id) {
        ReactDOM.render(<DemoBatteryVoltageChartWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}