let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import SensorlabApi from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_type = null;

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
            api.auth.token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should get list of measurements default page=1', (done) => {
            api.measurements.list()
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
                        measurement.should.have.property('created');
                        first_type = measurement.type;
                    });
                    done();
                }).catch((error) => {
                    console.log(error);
                });
        });

        it('should get list of measurements by type', (done) => {
            api.measurements.list({ type: first_type })
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
                        measurement.should.have.property('created');
                        first_type = measurement.type;
                    });
                    done();
                });
        });

        it('should get 422 error for bad `next` parameter', (done) => {
            api.measurements.list({ next: 123 })
                .catch((response) => {
                    response.should.have.property('status').eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.forEach((error) => {
                        error.should.be.a('object');
                        error.should.have.property('message');
                        error.should.have.property('code').eq(2);
                        error.should.have.property('param').eq('next');
                    });
                    done();
                }).then((response) => {
                });
        });

    });
});