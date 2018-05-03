let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import SensorlabApi from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi({rest_api_url: process.env.TEST_REST_API_URL}); //we must test on test server only

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
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
                        measurement.should.have.property('id');
                        measurement.should.have.property('sensor');
                        measurement.should.have.property('type');
                        measurement.should.have.property('value');
                        measurement.value.should.be.a('array');
                        measurement.should.have.property('received');
                        measurement.should.have.property('created');
                        measurement.should.have.property('measurementgroup');
                        first_type = measurement.type;
                    });
                    done();
                });
        });

        it('should get list of measurements by type', (done) => {
            api.measurements.list({ type: first_type })
                .then((response) => {
                    response.measurements.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
                        measurement.should.have.property('id');
                        measurement.should.have.property('sensor');
                        measurement.should.have.property('type').eq(first_type);
                        measurement.should.have.property('value');
                        measurement.value.should.be.a('array');
                        measurement.should.have.property('received');
                        measurement.should.have.property('created');
                        measurement.should.have.property('measurementgroup');
                        first_type = measurement.type;
                    });
                    done();
                });
        });

    });
});