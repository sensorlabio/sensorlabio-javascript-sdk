import React from 'react';
import ReactDOM from 'react-dom';
import DemoTemperatureChartWidgetComponent from "../../components/demo/DemoTemperatureChartWidgetComponent";

/**
 * Demo Temperature Chart Widget
 */
export default class DemoTemperatureChartWidget {
    /**
     * @constructor DemoTemperatureChartWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member DemoTemperatureChartWidget#render
     * @param container_id string ID of DOM object to render to
     */
    render(container_id) {
        ReactDOM.render(<DemoTemperatureChartWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}