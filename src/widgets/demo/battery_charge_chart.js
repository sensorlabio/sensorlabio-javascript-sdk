import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryChargeChartWidgetComponent from '../../components/demo/DemoBatteryChargeChartWidgetComponent';

/**
 * Demo Battery Charge Chart Widget
 */
export default class DemoBatteryChargeChartWidget {
    /**
     * @constructor DemoBatteryChargeChartWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member BatteryChargeChartWidget#render
     * @param container_id string ID of DOM object to render to
     */
    render(container_id) {
        ReactDOM.render(<DemoBatteryChargeChartWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}