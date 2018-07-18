let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let test_user = null;
let test_profile = null;

describe('Reset passwords endpoint', () => {
    describe('Profile change password', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.token(test_email, test_passw)
                .then(async function(user) {
                    user.token.should.not.be.empty;
                    test_user = user;
                    test_profile = await user.profile();
                    done();
                });
        });

        it('must return error if no data is provided', (done) => {
            api._users.reset_password_request()
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(200);
                    response.code.should.eq(1);
                    expect(response.message).not.empty;
                    done();
                });
        });
    });
});