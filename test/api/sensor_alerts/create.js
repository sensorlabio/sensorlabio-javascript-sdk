import {SensorlabApi} from '../../../src';

let uuid = require('uuid');

let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor = null;
let sensor_alert = null;

describe('Sensor alerts configuration endpoints', () => {
    describe('Create sensor alerts', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.sensor_alerts.create()
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

        it('should get list of sensors default page=1', (done) => {
            api.sensors.list()
                .then((response) => {
                    response.sensors.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    sensor = response.sensors[0];
                    done();
                });
        });

        it('should return error if `sensor` id is incorrect', (done) => {
            api.sensor_alerts.create(123)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 2, param: 'sensor'}]);
                    done();
                });
        });

        it('should return error if `threshold_type` id is empty', (done) => {
            api.sensor_alerts.create(sensor.id)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 3, param: 'threshold_type'}]);
                    done();
                });
        });

        it('should return error if `threshold_type` is wrong', (done) => {
            api.sensor_alerts.create(sensor.id, 'wrong_threshold_type')
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 4, param: 'threshold_type'}]);
                    done();
                });
        });

        it('should return error if `threshold_type` is wrong', (done) => {
            api.sensor_alerts.create(sensor.id, 'Min')
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 4, param: 'threshold_type'}]);
                    done();
                });
        });

        it('should return error if `measurement_type` is empty', (done) => {
            api.sensor_alerts.create(sensor.id, 'min')
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 5, param: 'measurement_type'}]);
                    done();
                });
        });

        it('should return error if `threshold_value` is empty', (done) => {
            api.sensor_alerts.create(sensor.id, 'min', 'TMP')
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 6, param: 'threshold_value'}]);
                    done();
                });
        });

        it('should return 404 if `sensor` does not exist', (done) => {
            api.sensor_alerts.create(uuid.v1(), 'min', 'TMP', 200)
                .catch((response) => {
                    response.status.should.eq(404);
                    done();
                });
        });


        it('should create new sensor alert configuration without problem', (done) => {
            api.sensor_alerts.create(sensor.id, 'min', 'TMP', 200)
                .then((new_sensor_alert) => {
                    new_sensor_alert.should.be.a('object');
                    new_sensor_alert.should.have.property('id');
                    new_sensor_alert.should.have.property('threshold_type').eq('min');
                    new_sensor_alert.should.have.property('measurement_type').eq('TMP');
                    new_sensor_alert.should.have.property('threshold_value').eq(200);
                    sensor_alert = new_sensor_alert;
                    done();
                });
        });

        it('should get new sensor alert', (done) => {
            api.sensor_alerts.get(sensor.id, sensor_alert.id)
                .then((new_sensor_alert) => {
                    new_sensor_alert.should.be.a('object');
                    new_sensor_alert.should.have.property('id').eq(sensor_alert.id);
                    new_sensor_alert.should.have.property('threshold_type').eq('min');
                    new_sensor_alert.should.have.property('measurement_type').eq('TMP');
                    new_sensor_alert.should.have.property('threshold_value').eq(200);
                    done();
                });
        });
    });
});