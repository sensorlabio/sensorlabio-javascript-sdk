import React from 'react';
import ReactDOM from 'react-dom';
import DemoMapWidgetComponent from '../../components/demo/DemoMapWidgetComponent';

export default class DemoMapWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id) {
        ReactDOM.render(<DemoMapWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}