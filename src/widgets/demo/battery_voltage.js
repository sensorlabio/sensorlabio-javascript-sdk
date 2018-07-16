import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryVoltageWidgetComponent from '../../components/demo/DemoBatteryVoltageWidgetComponent';

/**
 * Demo Battery Voltage Widget
 */
export default class DemoBatteryVoltageWidget {
    /**
     * @constructor DemoBatteryVoltageWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member DemoBatteryVoltageWidget#render
     * @param container_id string ID of DOM object to render to
     */
    render(container_id) {
        ReactDOM.render(<DemoBatteryVoltageWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}