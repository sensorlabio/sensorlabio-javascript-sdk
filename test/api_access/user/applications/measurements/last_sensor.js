let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor = null;
let first_type = null;

let last_application = null;
let public_api_key = null;
let private_api_key = null;

describe('Measurements endpoint', () => {
    describe('Get /measurements/last', () => {
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

        it('should get list of sensors default page=1', (done) => {
            api.sensors.list({sort: 'created,asc'})
                .then((response) => {
                    response.sensors.should.be.a('array').lengthOf(50);
                    sensor = response.sensors[0];
                    done();
                });
        });

        it('should get last measurement', (done) => {
            sensor.measurements.last()
                .then((measurement) => {
                    measurement.should.be.a('object');
                    measurement.should.have.property('type');
                    measurement.should.have.property('value');
                    measurement.value.should.be.a('array');
                    measurement.should.have.property('timestamp');
                    first_type = measurement.type;
                    done();
                });
        });

        it('should get last measurement by type', (done) => {
            sensor.measurements.last({type: first_type})
                .then((measurement) => {
                    measurement.should.be.a('object');
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