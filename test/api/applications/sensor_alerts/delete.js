import {SensorlabApi} from '../../../../src';

let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor_1 = null;
let sensor_2 = null;

let sensor_alert_1 = null;
let sensor_alert_2 = null;

let last_application = null;
let public_api_key = null;
let private_api_key = null;

describe('Sensor alerts configuration endpoints', () => {
    describe('Delete sensor alerts', () => {

        it('should get an 401 status error without authorization', (done) => {
            api.sensor_alerts.delete()
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

        it('should get list of applications', (done) => {
            api.applications.list({sort: 'created,asc'})
                .then((response) => {
                    response.applications.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    last_application = response.applications[0];
                    done();
                });
        });

        it('should generate new api key for application', (done) => {
            api.applications.generate_private_api_key(last_application.id)
                .then((application) => {
                    application.should.be.a('object');
                    application.should.have.property('id');
                    application.should.have.property('name');
                    application.should.have.property('description');
                    application.should.have.property('public_api_key');
                    application.should.have.property('private_api_key');
                    public_api_key = application.public_api_key;
                    private_api_key = application.private_api_key;
                    done();
                });
        });

        it('should authenticate application and get token', (done) => {
            api.auth.application_token(public_api_key, private_api_key)
                .then((user) => {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should get list of sensors and save one for testing', (done) => {
            api.sensors.list()
                .then((response) => {
                    sensor_1 = response.sensors[2];
                    sensor_2 = response.sensors[3];
                    done();
                });
        });

        it('should create new sensor alert configuration without problem', (done) => {
            api.sensor_alerts.create(sensor_1.id, 'max', 'TMP', 0)
                .then((new_sensor_alert) => {
                    new_sensor_alert.should.be.a('object');
                    new_sensor_alert.should.have.property('id');
                    new_sensor_alert.should.have.property('threshold_type').eq('max');
                    new_sensor_alert.should.have.property('measurement_type').eq('TMP');
                    new_sensor_alert.should.have.property('threshold_value').eq(0);
                    sensor_alert_1 = new_sensor_alert;
                    done();
                });
        });

        it('should create new sensor alert configuration without problem', (done) => {
            api.sensor_alerts.create(sensor_2.id, 'loc', 'LOC', {lat: 36.1812440939046, lng: -101.84828589116029, radius: 1000})
                .then((new_sensor_alert) => {
                    new_sensor_alert.should.be.a('object');
                    new_sensor_alert.should.have.property('id');
                    new_sensor_alert.should.have.property('threshold_type').eq('loc');
                    new_sensor_alert.should.have.property('measurement_type').eq('LOC');
                    new_sensor_alert.should.have.property('threshold_value').containSubset({lat: 36.1812440939046, lng: -101.84828589116029,radius: 1000});
                    sensor_alert_2 = new_sensor_alert;
                    done();
                });
        });

        it('should return error if `sensor` id and `id` are incorrect', (done) => {
            api.sensor_alerts.delete('123', '123')
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 2, param: 'sensor'}]);
                    response.errors.should.containSubset([{code: 4, param: 'id'}]);
                    done();
                });
        });

        it('should not update alert if does not belong to sensor', (done) => {
            api.sensor_alerts.delete(sensor_1.id, sensor_alert_2.id)
                .catch((response) => {
                    response.status.should.eq(404);
                    done();
                });
        });

        it('should not update alert if does not belong to sensor', (done) => {
            api.sensor_alerts.delete(sensor_2.id, sensor_alert_1.id)
                .catch((response) => {
                    response.status.should.eq(404);
                    done();
                });
        });

        it('should get first sensor alert config by id', (done) => {
            api.sensor_alerts.get(sensor_1.id, sensor_alert_1.id)
                .then((sensor_alert) => {
                    sensor_alert.should.be.a('object');
                    sensor_alert.should.have.property('id');
                    sensor_alert.should.have.property('threshold_type').eq('max');
                    sensor_alert.should.have.property('measurement_type').eq('TMP');
                    sensor_alert.should.have.property('threshold_value').eq(0);
                    done();
                });
        });

        it('should get first sensor alert config by id', (done) => {
            api.sensor_alerts.get(sensor_2.id, sensor_alert_2.id)
                .then((sensor_alert) => {
                    sensor_alert.should.be.a('object');
                    sensor_alert.should.have.property('id');
                    sensor_alert.should.have.property('threshold_type').eq('loc');
                    sensor_alert.should.have.property('measurement_type').eq('LOC');
                    sensor_alert.should.have.property('threshold_value').containSubset({lat: 36.1812440939046, lng: -101.84828589116029,radius: 1000});
                    done();
                });
        });

        it('should sensor alert 1', (done) => {
            api.sensor_alerts.delete(sensor_1.id, sensor_alert_1.id)
                .then((sensor_alert) => {
                    sensor_alert.should.be.a('object');
                    sensor_alert.should.have.property('success').eq(true);
                    done();
                });
        });

        it('should sensor alert 2', (done) => {
            api.sensor_alerts.delete(sensor_2.id, sensor_alert_2.id)
                .then((sensor_alert) => {
                    sensor_alert.should.be.a('object');
                    sensor_alert.should.have.property('success').eq(true);
                    done();
                });
        });

        it('should return 404 on deelted sensor alert', (done) => {
            api.sensor_alerts.get(sensor_1.id, sensor_alert_1.id)
                .catch((response) => {
                    response.status.should.eq(404);
                    done();
                });
        });

        it('should get first sensor alert config by id', (done) => {
            api.sensor_alerts.get(sensor_2.id, sensor_alert_2.id)
                .catch((response) => {
                    response.status.should.eq(404);
                    done();
                });
        });

    });
});