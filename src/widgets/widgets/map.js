import React from 'react';
import ReactDOM from 'react-dom';
import MapWidgetComponent from '../../components/MapWidgetComponent';

export default class MapWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id, sensor_id) {
        ReactDOM.render(<MapWidgetComponent api={this.api} sensor_id={sensor_id} />, document.getElementById(container_id));
    }
}