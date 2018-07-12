import DemoThermometerWidget from './demo/thermometer';

export default class DemoWidgets {
    constructor(api) {
        this.api = api;

        this.thermometer = new DemoThermometerWidget(api);
    }
}