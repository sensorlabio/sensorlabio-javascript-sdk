import React from 'react';
import ReactDOM from 'react-dom';
import ThermometerWidgetComponent from '../../components/ThermometerWidgetComponent';

export default class DemoThermometerWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<ThermometerWidgetComponent api={this.api} sensor={sensor_id} />, document.getElementById(container_id));
    }
}