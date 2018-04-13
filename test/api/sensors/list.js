let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let Api = require('../../../api');

//@todo change url to real public test server
let api = new Api('http://localhost:3000/api/v1'); //we must test on test server only

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
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    done();
                });
        });

        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.token(test_email, test_passw)
                .then(function(response) {
                    response.success.should.eq(true);
                    response.status.should.eq(200);
                    response.token.should.not.be.empty;
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
                    first_sensor_uniqueid = response.sensors[0].uniqueid;
                    done();
                });
        });

        it('should get list of sensors by name', (done) => {
            api.sensors.list(null, first_sensor_name)
                .then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id');
                        sensor.should.have.property('uniqueid');
                        sensor.should.have.property('imei');
                        sensor.should.have.property('name').eq(first_sensor_name);
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });

        it('should get list of sensors by imei', (done) => {
            api.sensors.list(null, null, null, first_sensor_imei)
                .then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id');
                        sensor.should.have.property('uniqueid');
                        sensor.should.have.property('imei').eq(first_sensor_imei);
                        sensor.should.have.property('name');
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });

        it('should get list of sensors by uniqueid', (done) => {
            api.sensors.list(null, null, first_sensor_uniqueid)
                .then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id');
                        sensor.should.have.property('uniqueid').eq(first_sensor_uniqueid);
                        sensor.should.have.property('imei');
                        sensor.should.have.property('name');
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });

        it('should get list of sensors by all search params', (done) => {
            api.sensors.list(null, first_sensor_name, first_sensor_uniqueid, first_sensor_imei)
                .then((response) => {
                    response.sensors.should.be.a('array');
                    expect(response.sensors.length).at.least(1);
                    response.sensors.forEach((sensor) => {
                        sensor.should.have.property('id');
                        sensor.should.have.property('uniqueid').eq(first_sensor_uniqueid);
                        sensor.should.have.property('imei').eq(first_sensor_imei);
                        sensor.should.have.property('name').eq(first_sensor_name);
                    });
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    first_sensor_name = response.sensors[0].name;
                    done();
                });
        });
    });
});