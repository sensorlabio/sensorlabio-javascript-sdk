let chai = require('chai');
var chaiSubset = require('chai-subset');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let test_user = null;
let test_profile = null;

chai.use(chaiSubset);

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
            api.auth.user_token(test_email, test_passw)
                .then(async function(user) {
                    user.token.should.not.be.empty;
                    test_user = user;
                    test_profile = await user.profile();
                    done();
                });
        });

        it('should return error if there is empty data sent', (done) => {
            test_profile.change_password()
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(422);
                    response.code.should.eq(422);
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 1, param: 'old_password'}]);
                    response.errors.should.containSubset([{code: 2, param: 'new_password'}]);
                    response.errors.should.containSubset([{code: 3, param: 'new_password_check'}]);
                    done();
                });
        });

        if('should return error if old password is incorrect', (done) => {
                test_profile.change_password('verywrongpassword')
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(422);
                    response.code.should.eq(422);
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 2, param: 'new_password'}]);
                    response.errors.should.containSubset([{code: 3, param: 'new_password_check'}]);
                    response.errors.should.containSubset([{code: 4, param: 'old_password'}]);
                    done();
                });
        });

        it('should return error if old password is correct but no new passwords provided', (done) => {
            test_profile.change_password(test_passw)
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(422);
                    response.code.should.eq(422);
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 2, param: 'new_password'}]);
                    response.errors.should.containSubset([{code: 3, param: 'new_password_check'}]);
                    done();
                });
        });

        it('should return error if old password is correct but no password_check', (done) => {
            test_profile.change_password(test_passw, 'newpass')
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(422);
                    response.code.should.eq(422);
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 3, param: 'new_password_check'}]);
                    done();
                });
        });

        it('should return error if old password is correct but no password', (done) => {
            test_profile.change_password(test_passw, null, 'newpass')
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(422);
                    response.code.should.eq(422);
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 2, param: 'new_password'}]);
                    done();
                });
        });

        it('should return error if old password is correct but new passwords are not equal', (done) => {
            test_profile.change_password(test_passw, 'Newpass', 'newpass')
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(422);
                    response.code.should.eq(422);
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 5, param: 'new_password_check'}]);
                    done();
                });
        });

        it('should return success if data is correct', (done) => {
            test_profile.change_password(test_passw, 'newpass', 'newpass')
                .then(function(response) {
                    response.success.should.eq(true);
                    response.status.should.eq(200);
                    response.code.should.eq(100);
                    expect(response.message).not.empty;
                    done();
                });
        });

        it('should NOT authorize with old password', (done) => {
            api.auth.user_token(test_email, test_passw)
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    done();
                });
        });

        it('sshould authorize with new password', (done) => {
            api.auth.user_token(test_email, 'newpass')
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should change password back', (done) => {
            test_profile.change_password('newpass', test_passw, test_passw)
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