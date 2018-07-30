import {SensorlabApi} from '../../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('Applications endpoints', () => {
    describe('GET /applications/self', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('application should get itself', (done) => {
            api.applications.update_self()
                .catch((response) => {
                    response.should.have.property('status').eq(401);
                    done();
                });
        });
    });
});