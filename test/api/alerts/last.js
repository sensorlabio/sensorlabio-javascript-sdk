import {SensorlabApi} from '../../../src';

let uuid = require('uuid');

let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor_1 = null;
let sensor_2 = null;

describe('Get last alerts for sensors', () => {
    describe('Get /sensors/:id/alerts/last', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.alerts.last()
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

        it('should get list of sensors and save one for testing', (done) => {
            api.sensors.list()
                .then((response) => {
                    sensor_1 = response.sensors[0];
                    sensor_2 = response.sensors[1];
                    done();
                });
        });

        it('should get list of alerts for first sensor', (done) => {
            api.alerts.last(sensor_1.id)
                .then((response) => {
                    response.alerts.forEach((alert) => {
                        alert.should.have.property('measurement');
                        alert.should.have.property('threshold');
                        alert.measurement.should.be.a('object');
                        alert.measurement.should.have.property('sensor').eq(sensor_1.id);
                        alert.measurement.should.have.property('timestamp');
                        alert.measurement.should.have.property('id');
                        alert.measurement.should.have.property('type');
                        alert.measurement.should.have.property('value');

                        alert.threshold.should.be.a('object');
                        alert.threshold.should.have.property('id');
                        alert.threshold.should.have.property('threshold_type');
                        alert.threshold.should.have.property('measurement_type');
                        alert.threshold.should.have.property('threshold_value');
                    });

                    done();
                });
        });

        it('should get list of alerts for second sensor', (done) => {
            api.alerts.last(sensor_2.id)
                .then((response) => {
                    response.alerts.forEach((alert) => {
                        alert.should.have.property('measurement');
                        alert.should.have.property('threshold');
                        alert.measurement.should.be.a('object');
                        alert.measurement.should.have.property('sensor').eq(sensor_2.id);
                        alert.measurement.should.have.property('timestamp');
                        alert.measurement.should.have.property('id');
                        alert.measurement.should.have.property('type');
                        alert.measurement.should.have.property('value');

                        alert.threshold.should.be.a('object');
                        alert.threshold.should.have.property('id');
                        alert.threshold.should.have.property('threshold_type');
                        alert.threshold.should.have.property('measurement_type');
                        alert.threshold.should.have.property('threshold_value');
                    });

                    done();
                });
        });

        it('should get 404 on unkown sensor', (done) => {
            api.alerts.last(uuid.v1())
                .catch((response) => {
                    response.status.should.eq(404);
                    done();
                });
        });

    });
});