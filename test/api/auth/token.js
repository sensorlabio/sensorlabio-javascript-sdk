let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import SensorlabApi from '../../..';

//@todo change url to real public test server
let api = new SensorlabApi('http://localhost:3000/api/v1'); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('Authorization endpoints', () => {
    /**
     * Get user token.
     */
    describe('Get token', () => {
        it('should get an 401 status error with wrong email/password', (done) => {
            api.auth.token('somegibberishemail@someotherlongstring.com', 'someuknownpasswordverylongbutitdoesntexits')
                .catch(function(response) {
                    //console.log(response);
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    expect(response.token).eq(null);
                    done();
                });
        });

        it('should get an 401 status error with correct email but wrong password', (done) => {
            api.auth.token(test_email, 'someuknownpasswordverylongbutitdoesntexits')
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    expect(response.token).eq(null);
                    done();
                });
        });

        it('passwords should work correctly', (done) => {
            api.auth.token(test_email, test_passw.toUpperCase())
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    expect(response.token).eq(null);
                    done();
                });
        });

        it('should authorize correctly', (done) => {
            api.auth.token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

    });
});