import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryChargeChartWidgetComponent from '../../components/demo/DemoBatteryChargeChartWidgetComponent';

export default class BatteryChargeChartWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id) {
        ReactDOM.render(<DemoBatteryChargeChartWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}