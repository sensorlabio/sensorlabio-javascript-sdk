let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import SensorlabApi from '../../..';

//@todo change url to real public test server
let api = new SensorlabApi('http://localhost:3000/api/v1'); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('Profile password change endpoint', () => {
    /**
     * Get user token.
     */
    describe('Profile change password', () => {
        it('should get 401 error without token', (done) => {
            api.profile.change_password()
                .catch(function(response) {
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

        it('should return error if there is empty data sent', (done) => {
            api.profile.change_password()
                .then(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(200);
                    response.code.should.eq(1);
                    expect(response.message).not.empty;
                    done();
                });
        });

        if('should return error if old password is incorrect', (done) => {
            api.profile.change_password('verywrongpassword')
                .then(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(200);
                    response.code.should.eq(2);
                    expect(response.message).not.empty;
                    done();
                });
        });

        it('should return error if old password is correct but no new passwords provided', (done) => {
            api.profile.change_password(test_passw)
                .then(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(200);
                    response.code.should.eq(3);
                    expect(response.message).not.empty;
                    done();
                });
        });

        it('should return error if old password is correct but no password_check', (done) => {
            api.profile.change_password(test_passw, 'newpass')
                .then(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(200);
                    response.code.should.eq(3);
                    expect(response.message).not.empty;
                    done();
                });
        });

        it('should return error if old password is correct but no password', (done) => {
            api.profile.change_password(test_passw, null, 'newpass')
                .then(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(200);
                    response.code.should.eq(3);
                    expect(response.message).not.empty;
                    done();
                });
        });

        it('should return error if old password is correct but new passwords are not equal', (done) => {
            api.profile.change_password(test_passw, 'Newpass', 'newpass')
                .then(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(200);
                    response.code.should.eq(4);
                    expect(response.message).not.empty;
                    done();
                });
        });

        it('should return success if data is correct', (done) => {
            api.profile.change_password(test_passw, 'newpass', 'newpass')
                .then(function(response) {
                    response.success.should.eq(true);
                    response.status.should.eq(200);
                    response.code.should.eq(100);
                    expect(response.message).not.empty;
                    done();
                });
        });

        it('should NOT authorize with old password', (done) => {
            api.auth.token(test_email, test_passw)
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    expect(response.token).eq(null);
                    done();
                });
        });

        it('sshould authorize with new password', (done) => {
            api.auth.token(test_email, 'newpass')
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should change password back', (done) => {
            api.profile.change_password('newpass', test_passw, test_passw)
                .then(function(response) {
                    response.success.should.eq(true);
                    response.status.should.eq(200);
                    response.code.should.eq(100);
                    expect(response.message).not.empty;
                    done();
                });
        });
    });
});