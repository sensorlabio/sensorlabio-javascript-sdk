import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_type = null;
let sensor = null;

describe('Measurements endpoint', () => {
    describe('Get /sensors/:id/measurements', () => {
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

        it('should get list of measurements', (done) => {
            sensor.measurements.list()
                .then((response) => {
                    response.measurements.should.be.a('array').lengthOf(50);
                    response.should.have.property('next');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
                        measurement.should.have.property('type');
                        measurement.should.have.property('value');
                        measurement.value.should.be.a('array');
                        measurement.should.have.property('timestamp');
                        first_type = measurement.type;
                    });
                    done();
                });
        });

        it('should get list of measurements by type', (done) => {
            sensor.measurements.list({ type: first_type })
                .then((response) => {
                    response.measurements.should.be.a('array').lengthOf(50);
                    response.should.have.property('next');
                    response.measurements.forEach((measurement) => {
                        measurement.should.be.a('object');
                        measurement.should.have.property('type').eq(first_type);
                        measurement.should.have.property('value');
                        measurement.value.should.be.a('array');
                        measurement.should.have.property('timestamp');
                        first_type = measurement.type;
                    });
                    done();
                });
        });

        it('should get 422 error for bad `next` parameter', (done) => {
            sensor.measurements.list({ next: 123 })
                .catch((response) => {
                    response.should.have.property('status').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.forEach((error) => {
                        error.should.be.a('object');
                        error.should.have.property('message');
                        error.should.have.property('code').eq(3);
                        error.should.have.property('param').eq('next');
                    });
                    done();
                });
        });

    });
});