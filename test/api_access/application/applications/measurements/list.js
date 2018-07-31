let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_type = null;

let first_sensor = null;

let last_application = null;
let public_api_key = null;
let private_api_key = null;

describe('Measurements endpoint', () => {
    describe('Get /measurements', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.measurements.list()
                .catch((response) => {
                    response.success.should.eq(false);
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

        it('should get list of sensors (we need the first one for tests)', (done) => {
            api.sensors.list({sort: 'created,asc'})
                .then((response) => {
                    response.sensors.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor = response.sensors[0];
                    done();
                });
        });

        it('should get 422 without sensor_id parameter', (done) => {
            api.measurements.list()
                .catch((response) => {
                    response.should.have.property('status').eq(422);
                    response.should.have.property('success').eq(false);
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

        it('should get 422 with sensor_id in wrong format', (done) => {
            api.measurements.list({sensor_id: '123'})
                .catch((response) => {
                    response.should.have.property('status').eq(422);
                    response.should.have.property('success').eq(false);
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

        it('should get list of measurements default page=1', (done) => {
            api.measurements.list({sensor_id: first_sensor.id})
                .then((response) => {
                    response.measurements.should.be.a('array').lengthOf(50);
                    response.should.have.property('next');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
                        measurement.should.have.property('id');
                        measurement.should.have.property('sensor');
                        measurement.should.have.property('type');
                        measurement.should.have.property('value');
                        measurement.value.should.be.a('array');
                        measurement.should.have.property('timestamp');
                        first_type = measurement.type;
                    });
                    done();
                });
        });

        it('should get list of measurements by type', (done) => {
            api.measurements.list({ type: first_type, sensor_id: first_sensor.id })
                .then((response) => {
                    response.measurements.should.be.a('array').lengthOf(50);
                    response.should.have.property('next');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
                        measurement.should.have.property('id');
                        measurement.should.have.property('sensor');
                        measurement.should.have.property('type').eq(first_type);
                        measurement.should.have.property('value');
                        measurement.value.should.be.a('array');
                        measurement.should.have.property('timestamp');
                        first_type = measurement.type;
                    });
                    done();
                });
        });

        it('should get 422 error for bad `next` parameter', (done) => {
            api.measurements.list({ next: 123, sensor_id: first_sensor.id })
                .catch((response) => {
                    response.should.have.property('status').eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.forEach((error) => {
                        error.should.be.a('object');
                        error.should.have.property('message');
                        error.should.have.property('code').eq(3);
                        error.should.have.property('param').eq('next');
                    });
                    done();
                });
        });

    });
});