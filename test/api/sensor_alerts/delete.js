let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_app = null;

describe('Applications endpoints', () => {
    describe('DELETE /applications/:id', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.applications.delete()
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
            api.applications.list()
                .then((response) => {
                    response.applications.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_app = response.applications[0];
                    done();
                });
        });

        it('should delete app', (done) => {
            api.applications.delete(first_app.id)
                .then((response) => {
                    response.status.should.eq(200);
                    response.should.have.property('success').eq(true);
                    response.should.have.property('code').eq(100);
                    response.should.have.property('message');
                    done();
                });
        });

        it('should get 404 error on deleted app', (done) => {
            api.applications.get(first_app.id)
                .catch((response) => {
                    response.status.should.eq(404);
                    done();
                });
        });
    });
});