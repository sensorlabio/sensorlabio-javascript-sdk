import React, {Component} from "react";
import {Crosshair, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import "react-vis/dist/style.css";

export default class DemoBatteryChargeChartWidgetComponent extends Component {
    constructor(props) {
        super(props);

        this.api = this.props.api;

        this.state = {
            crosshairValues: [{x: 0, y: 0}],
            charge_data: [],
        }

        this.timer = null;
        this.is_live = false;

        this._onMouseLeave = this._onMouseLeave.bind(this);
    }

    componentWillMount() {
        this.startWidget();
    }

    componentWillUnmount() {
        this.stopWidget();
    }

    startWidget() {
        this.is_live = true;
        this.updateWidget();
    }

    updateWidget() {
        this.api.demo.battery_charge_list().then((measurements_response) => {
            if (!this.is_live) return;
            this.setState({'charge_data': this.prepareData(measurements_response.measurements)})
            this.timer = setTimeout(() => {
                this.updateWidget()
            }, 1000);
        });
    }

    stopWidget() {
        this.is_live = false;
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    prepareData(measurements) {
        let data = [];
        measurements.forEach((measurement, i) => {
            data.push({x: measurement.timestamp, y: measurement.value[0]});
        });
        return data;
    }

    _onNearestX(v) {
        this.setState({crosshairValues: [v]});
    }

    _getCrosshairTitle(d) {
        let _value = new Date(d[0].x).getHours() + ':' + new Date(d[0].x).getMinutes() + ':' + new Date(d[0].x).getSeconds();
        return {title: 'Time', value: _value}
    }

    _getCrosshairItems(d) {
        return [{title: 'Charge', value: d[0].y + '%'}]
    }

    _onMouseLeave() {
        this.setState({crosshairValues: []});
    }

    render() {
        return (
            <XYPlot
                width={600}
                height={300}
                yDomain={[0, 100]}
                yBaseValue={0}
                xType="time"
                onMouseLeave={this._onMouseLeave}
            >

                <VerticalGridLines />
                <HorizontalGridLines />
                <LineSeries
                    data={this.state.charge_data}
                    onNearestX ={(value) => this._onNearestX(value) }
                />
                <XAxis />
                <YAxis />
                <Crosshair values={this.state.crosshairValues}
                           titleFormat={(d) => this._getCrosshairTitle(d)}
                           itemsFormat={(d) => this._getCrosshairItems(d)}
                />
            </XYPlot>

        )
    }
}