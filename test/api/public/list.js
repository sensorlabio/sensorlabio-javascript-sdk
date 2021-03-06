let chai = require('chai');
let expect = chai.expect;

import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_type = null;
let sensor = null;
let sensor2 = null;

let last_application = null;
let public_api_key = null;
let private_api_key = null;

describe('Public measurements list', () => {
    describe('Get /sensors/:id/measurements', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should get list of applications', (done) => {
            api.applications.list({sort: 'created,desc'})
                .then((response) => {
                    response.applications.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    last_application = response.applications[1];
                    done();
                });
        });

        it('should get list of sensors default page=1', (done) => {
            api.sensors.list({sort: 'created,asc'})
                .then((response) => {
                    expect(response.sensors.length).at.least(1);
                    response.sensors.should.be.a('array');
                    sensor = response.sensors[0];
                    sensor2 = response.sensors[1];
                    done();
                });
        });

        it('should make sensor public', (done) => {
            api.sensors.update(sensor.id, sensor.name, last_application.id, true)
                .then((response) => {
                    response.status.should.eq(200);
                    done();
                }).catch((e) => {
                console.log(e);
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

        it('should get list of measurements', (done) => {
            api.public.list(public_api_key, {sensor: sensor.id})
                .then((response) => {
                    response.measurements.should.be.a('array');
                    expect(response.measurements.length).at.least(1);
                    response.should.have.property('next');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
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
            api.public.list(public_api_key, {sensor: sensor.id, type: first_type})
                .then((response) => {
                    response.measurements.should.be.a('array').lengthOf(50);
                    response.should.have.property('next');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
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
            api.public.list(public_api_key, {sensor: sensor.id, type: first_type, next: 123})
                .catch((response) => {
                    response.should.have.property('status').eq(422);
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

        it('should make sensor private', (done) => {
            api.sensors.update(sensor.id, sensor.name, last_application.id, false)
                .then((response) => {
                    response.status.should.eq(200);
                    done();
                }).catch((e) => {
                console.log(e);
            });
        });

        it('should get 403 for non-public sensor measurements', (done) => {
            api.public.list(public_api_key, {sensor: sensor.id})
                .then((response) => {
                    console.log(response);
                })
                .catch((response) => {
                    response.status.should.eq(403);
                    done();
                });
        });


    });
});