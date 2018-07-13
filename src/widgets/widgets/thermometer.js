import React from 'react';
import ReactDOM from 'react-dom';
import ThermometerWidgetComponent from '../../components/ThermometerWidgetComponent';

export default class ThermometerWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<ThermometerWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}