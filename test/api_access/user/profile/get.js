import {SensorlabApi} from '../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let test_user = null;

describe('User: profile endpoints access check', () => {
    describe('Get profile', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    test_user = user;
                    done();
                });
        });

        it('should have access to endpoint', (done) => {
            api.profile.get()
                .then(function(profile) {
                    profile.email.should.eq(test_email);
                    done();
                });
        });

        it('should have access to endpoint', (done) => {
            test_user.profile()
                .then(function(profile) {
                    profile.email.should.eq(test_email);
                    done();
                });
        });
    });
});