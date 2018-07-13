import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryChargeWidgetComponent from '../../components/demo/DemoBatteryChargeWidgetComponent';

export default class DemoBatteryChargeWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id) {
        ReactDOM.render(<DemoBatteryChargeWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}