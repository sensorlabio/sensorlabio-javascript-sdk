import {SensorlabApi} from '../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let app = null;

describe('Application authorization endpoint', () => {
    describe('Get token', () => {

        it('should authorize user correctly', (done) => {
            api.auth.user_token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                })
                .catch((response) => {
                    console.log(response);
                });
        });

        it('should create application', (done) => {
            let data = {
                name: 'Test Application',
                description: 'Test Description',
            };
            api.applications.create(data.name, data.description)
                .then((application) => {
                    application.should.be.a('object');
                    application.should.have.property('id');
                    application.should.have.property('name').eq('Test Application');
                    application.should.have.property('description').eq('Test Description');
                    application.should.have.property('public_api_key');
                    application.should.have.property('private_api_key');
                    app = application;
                    done();
                });
        });

        /*
        it('should get an 401 status error with wrong email/password', (done) => {
            api.auth.token('somegibberishemail@someotherlongstring.com', 'someuknownpasswordverylongbutitdoesntexits')
                .catch(function(response) {
                    response.should.have.property('success').eq(false);
                    response.should.have.property('status').eq(401);
                    done();
                });
        });

        it('should get an 401 status error with correct email but wrong password', (done) => {
            api.auth.token(test_email, 'someuknownpasswordverylongbutitdoesntexits')
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    done();
                });
        });

        it('passwords should work correctly', (done) => {
            api.auth.token(test_email, test_passw.toUpperCase())
                .catch(function(response) {
                    response.success.should.eq(false);
                    response.status.should.eq(401);
                    done();
                });
        });

        it('should authorize correctly', (done) => {
            api.auth.token(test_email, test_passw)
                .then(function(user) {
                    user.token.should.not.be.empty;
                    done();
                })
                .catch((response) => {
                    console.log(response);
                });
        });
        */

    });
});