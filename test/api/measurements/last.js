let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_type = null;

let first_sensor = null;

describe('Measurements endpoint', () => {
    describe('Get /measurements/last', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.measurements.last()
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

        it('should get list of sensors (we need the first one for tests)', (done) => {
            api.sensors.list()
                .then((response) => {
                    response.sensors.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor = response.sensors[0];
                    done();
                });
        });

        it('should get 422 error without sensor_id', (done) => {
            api.measurements.last()
                .catch((response) => {
                    response.should.have.property('status').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.forEach((error) => {
                        error.should.be.a('object');
                        error.should.have.property('message');
                        error.should.have.property('code').eq(1);
                        error.should.have.property('param').eq('sensor_id');
                    });
                    done();
                });
        });

        it('should get 422 error with gibberish sensor 1', (done) => {
            api.measurements.last({sensor_id: '123'})
                .catch((response) => {
                    response.should.have.property('status').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.forEach((error) => {
                        error.should.be.a('object');
                        error.should.have.property('message');
                        error.should.have.property('code').eq(2);
                        error.should.have.property('param').eq('sensor_id');
                    });
                    done();
                });
        });

        it('should get last measurement', (done) => {
            api.measurements.last({sensor_id: first_sensor.id})
                .then((measurement) => {
                    measurement.should.be.a('object');
                    measurement.should.have.property('id');
                    measurement.should.have.property('sensor');
                    measurement.should.have.property('type');
                    measurement.should.have.property('value');
                    measurement.value.should.be.a('array');
                    measurement.should.have.property('timestamp');
                    first_type = measurement.type;
                    done();
                });
        });

        it('should get last measurement by type', (done) => {
            api.measurements.last({type: first_type, sensor_id: first_sensor.id})
                .then((measurement) => {
                    measurement.should.be.a('object');
                    measurement.should.have.property('id');
                    measurement.should.have.property('sensor');
                    measurement.should.have.property('type');
                    measurement.should.have.property('value');
                    measurement.value.should.be.a('array');
                    measurement.should.have.property('timestamp');
                    first_type = measurement.type;
                    done();
                });
        });
    });
});