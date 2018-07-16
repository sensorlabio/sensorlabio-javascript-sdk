import React from 'react';
import ReactDOM from 'react-dom';
import DemoThermometerWidgetComponent from '../../components/demo/DemoThermometerWidgetComponent';

/**
 * Demo Thermometer Widget
 */
export default class DemoThermometerWidget {
    /**
     * @constructor DemoThermometerWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member DemoThermometerWidget#render
     * @param container_id string ID of DOM object to render to
     */
    render(container_id) {
        ReactDOM.render(<DemoThermometerWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}