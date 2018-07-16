import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryChargeWidgetComponent from '../../components/demo/DemoBatteryChargeWidgetComponent';

/**
 * Demo Battery Charge Widget
 */
export default class DemoBatteryChargeWidget {
    /**
     * @constructor DemoBatteryChargeWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member DemoBatteryChargeWidget#render
     * @param container_id string ID of DOM object to render to
     */
    render(container_id) {
        ReactDOM.render(<DemoBatteryChargeWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}