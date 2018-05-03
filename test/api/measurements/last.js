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
    describe('Get /measurements/last', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.measurements.last()
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

        it('should get last measurement', (done) => {
            api.measurements.last()
                .then((measurement) => {
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
                    done();
                });
        });

        it('should get last measurement by type', (done) => {
            api.measurements.last({type: first_type})
                .then((measurement) => {
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
                    done();
                });
        });
    });
});