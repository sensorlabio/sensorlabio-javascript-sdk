let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let Api = require('../../../api');

//@todo change url to real public test server
let api = new Api('http://localhost:3000/api/v1'); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let first_sensor_id = null;

describe('Sensors endpoint', () => {
    describe('GET /sensors/:id', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.sensors.one()
                .catch((response) => {
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    done();
                });
        });

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
                    first_sensor_id = response.sensors[0].id;
                    done();
                });
        });

        it('should get sensor', (done) => {
            api.sensors.one(first_sensor_id)
                .then((response) => {
                    response.should.have.property('id').eq(first_sensor_id);
                    response.should.have.property('uniqueid');
                    response.should.have.property('imei');
                    response.should.have.property('name');
                    done();
                });
        });

        it('should get 404 error on uknown sensor', (done) => {
            api.sensors.one('someid')
                .catch((response) => {
                    response.success.should.eq(false);
                    response.status.should.eq(404);
                    done();
                });
        });

    });
});