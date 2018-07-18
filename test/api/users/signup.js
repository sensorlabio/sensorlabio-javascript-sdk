let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
var chaiSubset = require('chai-subset');
import {SensorlabApi} from '../../../src';

let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test+test'+Math.random()+'@sensorlab.io';
let test_passw = 'test';

chai.use(chaiSubset);

describe('Users endpoints', () => {
    describe('POST /signup', () => {
        it('should return error if there is no email', (done) => {
            api._users.signup()
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('code').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 1, param: 'email'}]);
                    response.errors.should.containSubset([{code: 2, param: 'email'}]);
                    response.errors.should.containSubset([{code: 4, param: 'password'}]);
                    response.errors.should.containSubset([{code: 5, param: 'password_check'}]);
                    done();
                });
        });

        it('should return error if email in wrong format', (done) => {
            var data = {'email': 'test'};
            api._users.signup(data.email)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('code').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 2, param: 'email'}]);
                    response.errors.should.containSubset([{code: 4, param: 'password'}]);
                    response.errors.should.containSubset([{code: 5, param: 'password_check'}]);
                    done();
                });
        });

        it('should return error if none of passwords is provided', (done) => {
            var data = {'email': test_email};
            api._users.signup(data.email)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('code').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 4, param: 'password'}]);
                    response.errors.should.containSubset([{code: 5, param: 'password_check'}]);
                    done();
                });
        });

        it('should return error if is password only provided', (done) => {
            var data = {'email': test_email, 'password': test_passw};
            api._users.signup(data.email, data.password)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('code').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 5, param: 'password_check'}]);
                    response.errors.should.containSubset([{code: 6, param: 'password_check'}]);
                    done();
                });
        });

        it('should return error if only password check provided', (done) => {
            var data = {'email': test_email, 'password': test_passw};
            api._users.signup(data.email, null, data.password)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('code').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 4, param: 'password'}]);
                    response.errors.should.containSubset([{code: 6, param: 'password_check'}]);
                    done();
                });
        });

        it('should return error if only password check provided', (done) => {
            var data = {'email': test_email, 'password': test_passw};
            api._users.signup(data.email, 'password', data.password)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('code').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 6, param: 'password_check'}]);
                    done();
                });
        });

        it('should return success if everything is correct', (done) => {
            var data = {'email': test_email, 'password': test_passw};
            api._users.signup(data.email, data.password, data.password)
                .then((response) => {
                    response.status.should.eq(200);
                    response.should.have.property('success').eq(true);
                    response.should.have.property('code').eq(100);
                    done();
                });
        });

    });
});