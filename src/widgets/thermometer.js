import React from 'react';
import ReactDOM from 'react-dom';
import ThermometerWidgetComponent from '../components/ThermometerWidgetComponent';

export default class ThermometerWidget {
    constructor(api) {
        this.api = api;
    }

    render(container_id) {
        ReactDOM.render(<ThermometerWidgetComponent api={this.api} />, document.getElementById(container_id));
    }
}