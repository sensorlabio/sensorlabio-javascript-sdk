let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_sensor_name = null;
let first_sensor_uniqueid = null;
let first_sensor_imei = null;

describe('Sensors endpoint', () => {
    describe('Get /sensors', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.sensors.list()
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

        it('should get list of sensors default page=1', (done) => {
            api.sensors.list()
                .then((response) => {
                    response.sensors.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    first_sensor_imei = response.sensors[0].imei;
                    first_sensor_uniqueid = response.sensors[0].id;
                    done();
                });
        });

        it('should get list of sensors by name', (done) => {
            api.sensors.list({ name: first_sensor_name })
                .then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id');
                        sensor.should.have.property('imei');
                        sensor.should.have.property('name').containIgnoreSpaces(first_sensor_name);
                        sensor.should.have.property('batteryCharge');
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });

        it('should get list of sensors by imei', (done) => {
            api.sensors.list({ imei: first_sensor_imei })
                .then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id');
                        sensor.should.have.property('imei').eq(first_sensor_imei);
                        sensor.should.have.property('name');
                        sensor.should.have.property('batteryCharge');
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });

        it('should get list of sensors by id', (done) => {
            api.sensors.list({ id: first_sensor_uniqueid })
                .then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id').eq(first_sensor_uniqueid);
                        sensor.should.have.property('imei');
                        sensor.should.have.property('name');
                        sensor.should.have.property('batteryCharge');
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });

        it('should get list of sensors by all search params', (done) => {
            api.sensors.list({
                    name: first_sensor_name,
                    id: first_sensor_uniqueid,
                    imei: first_sensor_imei
                }).then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id').eq(first_sensor_uniqueid);
                        sensor.should.have.property('imei').eq(first_sensor_imei);
                        sensor.should.have.property('name').containIgnoreSpaces(first_sensor_name);
                        sensor.should.have.property('batteryCharge');
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });
    });
});