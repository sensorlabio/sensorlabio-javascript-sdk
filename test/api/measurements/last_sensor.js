let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import SensorlabApi from '../../..';

//@todo change url to real public test server
let api = new SensorlabApi('http://localhost:3000/api/v1'); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let sensor = null;
let first_type = null;

describe('Measurements endpoint', () => {
    describe('Get /measurements/last', () => {
        it('should authorize with correct email/password and get a token', (done) => {
            api.auth.token(test_email, test_passw)
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
                    sensor = response.sensors[0];
                    done();
                });
        });

        it('should get last measurement', (done) => {
            sensor.measurements.last()
                .then((measurement) => {
                    measurement.should.be.a('object');
                    measurement.should.have.property('id');
                    measurement.should.have.property('sensor');
                    measurement.should.have.property('type');
                    measurement.should.have.property('value');
                    measurement.value.should.be.a('array');
                    measurement.should.have.property('recieved');
                    measurement.should.have.property('created');
                    measurement.should.have.property('measurementgroup');
                    first_type = measurement.type;
                    done();
                });
        });

        it('should get last measurement by type', (done) => {
            sensor.measurements.last({type: first_type})
                .then((measurement) => {
                    measurement.should.be.a('object');
                    measurement.should.have.property('id');
                    measurement.should.have.property('sensor');
                    measurement.should.have.property('type');
                    measurement.should.have.property('value');
                    measurement.value.should.be.a('array');
                    measurement.should.have.property('recieved');
                    measurement.should.have.property('created');
                    measurement.should.have.property('measurementgroup');
                    first_type = measurement.type;
                    done();
                });
        });
    });
});