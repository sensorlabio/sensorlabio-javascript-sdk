import React from 'react';
import ReactDOM from 'react-dom';
import BatteryVoltageWidgetComponent from '../../components/BatteryVoltageWidgetComponent';

export default class BatteryVoltageWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<BatteryVoltageWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}