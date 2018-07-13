import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryVoltageWidgetComponent from '../../components/demo/DemoBatteryVoltageWidgetComponent';

export default class DemoBatteryVoltageWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id) {
        ReactDOM.render(<DemoBatteryVoltageWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}