let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import SensorlabApi from '../../..';

//@todo change url to real public test server
let api = new SensorlabApi('http://localhost:3000/api/v1'); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('Get profile endpoint', () => {
    /**
     * Get user token.
     */
    describe('Get profile', () => {
        it('should get 401 error without token', (done) => {
            api.profile.get()
                .catch(function(response) {
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

        it('should get a profile', (done) => {
            api.profile.get()
                .then(function(profile) {
                    profile.email.should.eq(test_email);
                    done();
                });
        });
    });
});