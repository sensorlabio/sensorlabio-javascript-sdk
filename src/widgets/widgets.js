import ThermometerWidget from './widgets/thermometer';

export default class Widgets {
    constructor(api) {
        this.api = api;

        this.thermometer = new ThermometerWidget(api);
    }
}