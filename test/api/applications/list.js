let chai = require('chai');
let chai_string  = require('chai-string');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_application = null;

chai.use(chai_string);

describe('Applications endpoint', () => {
    describe('Get /applications', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.applications.list()
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

        it('should get list of application default page=1', (done) => {
            api.applications.list()
                .then((response) => {
                    response.applications.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_application = response.applications[0];
                    done();
                });
        });

        it('should get list of applications by name', (done) => {
            api.applications.list({ name: first_application.name })
                .then((response) => {
                    response.applications.should.be.a('array');
                    expect(response.applications.length).at.least(1);
                    response.applications.forEach((application) => {
                        application.should.have.property('id');
                        application.should.have.property('name');
                        application.should.have.property('description');
                        application.should.have.property('created');

                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    done();
                });
        });
    });
});