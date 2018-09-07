import {SensorlabApi} from '../../../../src';

let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor_1 = null;
let sensor_2 = null;
let sensor_alert_1 = null;
let sensor_alert_2 = null;
let last_application = null;
let public_api_key = null;
let private_api_key = null;

describe('Sensor alerts configuration endpoints', () => {
    describe('Get /sensor/(id)/alerts', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.sensor_alerts.list()
                .catch((response) => {
                    response.status.should.eq(401);
                    done();
                });
        });

        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should get list of applications', (done) => {
            api.applications.list({sort: 'created,asc'})
                .then((response) => {
                    response.applications.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    last_application = response.applications[0];
                    done();
                });
        });

        it('should generate new api key for application', (done) => {
            api.applications.generate_private_api_key(last_application.id)
                .then((application) => {
                    application.should.be.a('object');
                    application.should.have.property('id');
                    application.should.have.property('name');
                    application.should.have.property('description');
                    application.should.have.property('public_api_key');
                    application.should.have.property('private_api_key');
                    public_api_key = application.public_api_key;
                    private_api_key = application.private_api_key;
                    done();
                });
        });

        it('should authenticate application and get token', (done) => {
            api.auth.application_token(public_api_key, private_api_key)
                .then((user) => {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should get list of sensors and save one for testing', (done) => {
            api.sensors.list()
                .then((response) => {
                    sensor_1 = response.sensors[0];
                    sensor_2 = response.sensors[1];
                    done();
                });
        });

        it('should create new sensor alert configuration without problem', (done) => {
            api.sensor_alerts.create(sensor_1.id, 'min', 'TMP', 200)
                .then((new_sensor_alert) => {
                    new_sensor_alert.should.be.a('object');
                    new_sensor_alert.should.have.property('id');
                    new_sensor_alert.should.have.property('threshold_type').eq('min');
                    new_sensor_alert.should.have.property('measurement_type').eq('TMP');
                    new_sensor_alert.should.have.property('threshold_value').eq(200);
                    sensor_alert_1 = new_sensor_alert;
                    done();
                });
        });

        it('should create new sensor alert configuration without problem', (done) => {
            api.sensor_alerts.create(sensor_1.id, 'max', 'TMP', 0)
                .then((new_sensor_alert) => {
                    new_sensor_alert.should.be.a('object');
                    new_sensor_alert.should.have.property('id');
                    new_sensor_alert.should.have.property('threshold_type').eq('max');
                    new_sensor_alert.should.have.property('measurement_type').eq('TMP');
                    new_sensor_alert.should.have.property('threshold_value').eq(0);
                    sensor_alert_1 = new_sensor_alert;
                    done();
                });
        });

        it('should create new sensor alert configuration without problem', (done) => {
            api.sensor_alerts.create(sensor_2.id, 'loc', 'LOC', '36.1812440939046,-101.84828589116029,1000')
                .then((new_sensor_alert) => {
                    new_sensor_alert.should.be.a('object');
                    new_sensor_alert.should.have.property('id');
                    new_sensor_alert.should.have.property('threshold_type').eq('loc');
                    new_sensor_alert.should.have.property('measurement_type').eq('LOC');
                    new_sensor_alert.should.have.property('threshold_value').containSubset({lat: 36.1812440939046, lng: -101.84828589116029,radius: 1000});
                    sensor_alert_2 = new_sensor_alert;
                    done();
                });
        });

        it('should get list of sensor alerts for first sensor', (done) => {
            api.sensor_alerts.list(sensor_1.id)
                .then((response) => {
                    response.sensor_alerts.forEach((alert) => {
                        alert.should.be.a('object');
                        alert.should.have.property('id');
                        alert.should.have.property('threshold_type');
                        alert.should.have.property('measurement_type');
                        alert.should.have.property('threshold_value');
                    });

                    response.sensor_alerts.should.containSubset([{threshold_type: 'min', measurement_type: 'TMP', threshold_value: 200 }]);
                    response.sensor_alerts.should.containSubset([{threshold_type: 'max', measurement_type: 'TMP', threshold_value: 0}]);

                    response.sensor_alerts.should.not.containSubset([{threshold_value: {lat: 36.1812440939046, lng: -101.84828589116029, radius: 1000}}]);


                    done();
                });
        });

        it('should get list of sensor alerts for second sensor', (done) => {
            api.sensor_alerts.list(sensor_2.id)
                .then((response) => {
                    response.sensor_alerts.forEach((alert) => {
                        alert.should.be.a('object');
                        alert.should.have.property('id');
                        alert.should.have.property('threshold_type');
                        alert.should.have.property('measurement_type');
                        alert.should.have.property('threshold_value');
                    });

                    response.sensor_alerts.should.not.containSubset([{threshold_type: 'min', measurement_type: 'TMP', threshold_value: 200 }]);
                    response.sensor_alerts.should.not.containSubset([{threshold_type: 'max', measurement_type: 'TMP', threshold_value: 0}]);

                    response.sensor_alerts.should.containSubset([{threshold_value: {lat: 36.1812440939046, lng: -101.84828589116029, radius: 1000}}]);


                    done();
                });
        });
    });
});