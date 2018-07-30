import {SensorlabApi} from '../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let test_user = null;
let test_profile = null;

describe('User: profile/change_password endpoint user token access check', () => {
    describe('Profile change password', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(async function(user) {
                    user.token.should.not.be.empty;
                    test_user = user;
                    test_profile = await user.profile();
                    done();
                });
        });

        it('should have access to endpoint', (done) => {
            api.profile.change_password()
                .catch(function(response) {
                    response.status.should.not.eq(401);
                    response.code.should.not.eq(401);
                    done();
                });
        });

        it('should have access to endpoint', (done) => {
            test_profile.change_password()
                .catch(function(response) {
                    response.status.should.not.eq(401);
                    response.code.should.not.eq(401);
                    done();
                });
        });
    });
});