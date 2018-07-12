import React from 'react';
import ReactDOM from 'react-dom';
import DemoThermometerWidgetComponent from '../../components/demo/DemoThermometerWidgetComponent';

export default class DemoThermometerWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id) {
        ReactDOM.render(<DemoThermometerWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}