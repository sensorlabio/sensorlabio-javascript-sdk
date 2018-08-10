import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor = null;
let app = null;

describe('Sensors update endpoint', () => {
    describe('GET /sensors/:id', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.sensors.update()
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

        it('should get list of sensors', (done) => {
            api.sensors.list()
                .then((response) => {
                    response.sensors.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    sensor = response.sensors[0];
                    done();
                });
        });

        it('should create application', (done) => {
            let data = {
                name: 'Test Application',
                description: 'Test Description',
            };
            api.applications.create(data.name, data.description)
                .then((application) => {
                    application.should.be.a('object');
                    application.should.have.property('id');
                    application.should.have.property('name').eq('Test Application');
                    application.should.have.property('description').eq('Test Description');
                    application.should.have.property('public_api_key');
                    application.should.have.property('private_api_key');
                    app = application;
                    done();
                });
        });

        it('should return error if there is no `name` field', (done) => {
            api.sensors.update(sensor.id)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 1, param: 'name'}]);
                    done();
                });
        });

        it('should return error if `application` field is incorrect format', (done) => {
            api.sensors.update(sensor.id, 'Updated sensor information', '123')
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 2, param: 'application'}]);
                    done();
                });
        });

        it('should update sensor', (done) => {
            let data = {
                name: 'Updated Test Sensor',
                application: app.id,
            };
            api.sensors.update(sensor.id, data.name, data.application)
                .then((response) => {
                    response.status.should.eq(200);
                    response.should.have.property('success').eq(true);
                    response.should.have.property('code').eq(100);
                    response.should.have.property('message');
                    done();
                });
        });

        it('should get updated sensor', (done) => {
            api.sensors.get(sensor.id)
                .then((sensor) => {
                    sensor.should.have.property('id').eq(sensor.id);
                    sensor.should.have.property('imei');
                    sensor.should.have.property('name');
                    sensor.should.have.property('batteryCharge');
                    sensor.should.have.property('application').eq(app.id)
                    done();
                });
        });

        it('should return error if `is_public` field is incorrect', (done) => {
            api.sensors.update(sensor.id, 'Updated sensor information', null, 'test')
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 3, param: 'is_public'}]);
                    done();
                });
        });

        it('should set sensor public', (done) => {
            let data = {
                name: 'Updated Test Sensor',
                application: app.id,
                is_public: true,
            };
            api.sensors.update(sensor.id, data.name, data.application, data.is_public)
                .then((response) => {
                    response.status.should.eq(200);
                    response.should.have.property('success').eq(true);
                    response.should.have.property('code').eq(100);
                    response.should.have.property('message');
                    done();
                });
        });

        it('should get updated sensor with is_public=true', (done) => {
            api.sensors.get(sensor.id)
                .then((sensor) => {
                    sensor.should.have.property('id').eq(sensor.id);
                    sensor.should.have.property('imei');
                    sensor.should.have.property('name');
                    sensor.should.have.property('batteryCharge');
                    sensor.should.have.property('application').eq(app.id);
                    sensor.should.have.property('is_public').eq(true);
                    done();
                });
        });

        it('should set sensor private', (done) => {
            let data = {
                name: 'Updated Test Sensor',
                application: app.id,
                is_public: false,
            };
            api.sensors.update(sensor.id, data.name, data.application, data.is_public)
                .then((response) => {
                    response.status.should.eq(200);
                    response.should.have.property('success').eq(true);
                    response.should.have.property('code').eq(100);
                    response.should.have.property('message');
                    done();
                });
        });

        it('should get updated sensor with is_public=false', (done) => {
            api.sensors.get(sensor.id)
                .then((sensor) => {
                    sensor.should.have.property('id').eq(sensor.id);
                    sensor.should.have.property('imei');
                    sensor.should.have.property('name');
                    sensor.should.have.property('batteryCharge');
                    sensor.should.have.property('application').eq(app.id);
                    sensor.should.have.property('is_public').eq(false);
                    done();
                });
        });

    });
});