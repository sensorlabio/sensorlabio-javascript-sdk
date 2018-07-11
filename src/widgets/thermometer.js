import React from 'react';
import ReactDOM from 'react-dom';
import ThermometerWidgetComponent from '../components/ThermometerWidgetComponent';

export default class ThermometerWidget {
    constructor(api) {
        this.api = api;
    }

    render() {
        ReactDOM.render(<ThermometerWidgetComponent api={this.api} />, document.getElementById('container'));
    }
}