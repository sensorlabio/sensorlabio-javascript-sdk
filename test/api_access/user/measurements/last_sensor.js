import {SensorlabApi} from '../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor = null;

describe('User: /measurements last endpoint for sensor', () => {
    describe('Get /measurements/last', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should get list of sensors default page=1', (done) => {
            api.sensors.list()
                .then((response) => {
                    response.sensors.should.be.a('array').lengthOf(50);
                    sensor = response.sensors[0];
                    done();
                });
        });

        it('should have access to endpoint', (done) => {
            sensor.measurements.last()
                .then((measurement) => {
                    measurement.should.be.a('object');
                    measurement.should.have.property('id');
                    measurement.should.have.property('sensor');
                    measurement.should.have.property('type');
                    measurement.should.have.property('value');
                    measurement.value.should.be.a('array');
                    measurement.should.have.property('timestamp');
                    done();
                });
        });
    });
});