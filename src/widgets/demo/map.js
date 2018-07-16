import React from 'react';
import ReactDOM from 'react-dom';
import DemoMapWidgetComponent from '../../components/demo/DemoMapWidgetComponent';

/**
 * Demo Map Widget
 */
export default class DemoMapWidget {
    /**
     * @constructor DemoMapWidget
     * @param api SensorlabApi
     */
    constructor(api) {
        this.api = api;
    }

    /**
     * Render widget.
     *
     * @member DemoMapWidget#render
     * @param container_id string ID of DOM object to render to
     */
    render(container_id) {
        ReactDOM.render(<DemoMapWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}