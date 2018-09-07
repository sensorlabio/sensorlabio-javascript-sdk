import {SensorlabApi} from '../../../../src';

let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('User: Sensor alerts configuration endpoints', () => {
    describe('Get sensor alert', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should have access', (done) => {
            api.sensor_alerts.get()
                .catch((response) => {
                    response.status.should.not.eq(401);
                    done();
                });
        });
    });
});