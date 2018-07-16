import React from 'react';
import ReactDOM from 'react-dom';
import DemoBatteryVoltageChartWidgetComponent from '../../components/demo/DemoBatteryVoltageChartWidgetComponent';

/**
 * Demo Battery Voltage Chart Widget
 */
export default class DemoBatteryVoltageChartWidget {
    /**
     * @constructor DemoBatteryVoltageChartWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member BatteryVoltageChartWidget#render
     * @param container_id string ID of DOM object to render to
     */
    render(container_id) {
        ReactDOM.render(<DemoBatteryVoltageChartWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}