import {SensorlabApi} from '../../../../src';

//@todo change url to real public test server
let api = new SensorlabApi(process.env.TEST_REST_API_URL); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

let app = null;

let last_application = null;
let public_api_key = null;
let private_api_key = null;

describe('Applications endpoints', () => {
    describe('PATCH /applications', () => {
        it('should get an 401 status error without authorization', (done) => {
            api.applications.update_self()
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

        it('should get list of applications', (done) => {
            api.applications.list({sort: 'created,asc'})
                .then((response) => {
                    response.applications.should.be.a('array').lengthOf(50);
                    response.should.have.property('count');
                    response.should.have.property('pages');
                    last_application = response.applications[0];
                    done();
                });
        });

        it('should generate new api key for application', (done) => {
            api.applications.generate_private_api_key(last_application.id)
                .then((application) => {
                    application.should.be.a('object');
                    application.should.have.property('id');
                    application.should.have.property('name');
                    application.should.have.property('description');
                    application.should.have.property('public_api_key');
                    application.should.have.property('private_api_key');
                    public_api_key = application.public_api_key;
                    private_api_key = application.private_api_key;
                    done();
                });
        });

        it('should authenticate application and get token', (done) => {
            api.auth.application_token(public_api_key, private_api_key)
                .then((user) => {
                    user.token.should.not.be.empty;
                    done();
                });
        });

        it('should return error if there is no `name` field', (done) => {
            api.applications.update_self()
                .catch((response) => {
                    response.status.should.eq(422);
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
            api.applications.update_self(data.name, data.description)
                .then((response) => {
                    response.status.should.eq(200);
                    response.should.have.property('message');
                    done();
                });
        });

        it('should get updated created app', (done) => {
            api.applications.get_self()
                .then((application) => {
                    application.should.have.property('id').eq(last_application.id);
                    application.should.have.property('name').eq('Updated Test Application');
                    application.should.have.property('description').eq('Updated Test Description');
                    application.should.have.property('created');
                    done();
                });
        });
    });
});