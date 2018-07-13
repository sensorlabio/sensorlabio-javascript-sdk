import React from 'react';
import ReactDOM from 'react-dom';
import BatteryChargeWidgetComponent from '../../components/BatteryChargeWidgetComponent';

export default class BatteryChargeWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryChargeWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}