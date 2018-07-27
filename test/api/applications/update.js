let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let app = null;

describe('Applications endpoints', () => {
    describe('PATCH /applications', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.applications.update()
                .catch((response) => {
                    response.success.should.eq(false);
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
            api.applications.list()
                .then((response) => {
                    response.applications.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    app = response.applications[0];
                    done();
                });
        });

        it('should return error if there is no `name` field', (done) => {
            api.applications.update(app.id)
                .catch((response) => {
                    response.status.should.eq(422);
                    response.should.have.property('success').eq(false);
                    response.should.have.property('code').eq(422);
                    response.should.have.property('errors');
                    response.errors.should.be.a('array');
                    response.errors.should.containSubset([{code: 1, param: 'name'}]);
                    done();
                });
        });

        it('should update application', (done) => {
            let data = {
                name: 'Updated Test Application',
                description: 'Updated Test Description',
            };
            api.applications.update(app.id, data.name, data.description)
                .then((response) => {
                    response.status.should.eq(200);
                    response.should.have.property('success').eq(true);
                    response.should.have.property('code').eq(100);
                    response.should.have.property('message');
                    done();
                });
        });

        it('should get updated created app', (done) => {
            api.applications.get(app.id)
                .then((application) => {
                    application.should.have.property('id').eq(app.id);
                    application.should.have.property('name').eq('Updated Test Application');
                    application.should.have.property('description').eq('Updated Test Description');
                    application.should.have.property('created');
                    done();
                });
        });
    });
});