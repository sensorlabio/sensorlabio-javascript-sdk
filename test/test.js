process.env.TEST_REST_API_URL = 'http://localhost:3000/api';
process.env.RECIEVER_MQTT_PORT = 1883;

let chai = require('chai');
let chai_http = require('chai-http');
let chai_string  = require('chai-string');
let chai_subset = require('chai-subset');
let should = chai.should();

chai.use(chai_string);
chai.use(chai_subset);
chai.use(chai_http);

//public endpoints
//require('./api/users/signup');

//user auth
require('./api/auth/user_token');

//user token access endpoints
require('./api/profile/get');
require('./api/profile/change_password');
require('./api/applications/list');
require('./api/applications/get');
require('./api/applications/create');
require('./api/applications/update');
require('./api/applications/delete');
require('./api/applications/generate_api_key');
require('./api/sensors/list');
require('./api/sensors/get');
require('./api/sensors/update');

require('./api/sensor_alerts/create');
require('./api/sensor_alerts/list');
require('./api/sensor_alerts/get');
require('./api/sensor_alerts/update');
require('./api/sensor_alerts/delete');

require('./api/measurements/list');
require('./api/measurements/last');
require('./api/measurements/list_sensor');
require('./api/measurements/last_sensor');

require('./api/alerts/last');

//application auth
require('./api/auth/application_token');

//application token access endpoints
require('./api/applications/sensors/list');
require('./api/applications/sensors/get');
require('./api/applications/sensors/update');

require('./api/applications/sensor_alerts/create');
require('./api/applications/sensor_alerts/list');
require('./api/applications/sensor_alerts/get');
require('./api/applications/sensor_alerts/update');
require('./api/applications/sensor_alerts/delete');

require('./api/applications/measurements/list');
require('./api/applications/measurements/last');
require('./api/applications/measurements/list_sensor');
require('./api/applications/measurements/last_sensor');

require('./api/applications/alerts/last');

require('./api/applications/applications/get');
require('./api/applications/applications/update');
require('./api/applications/applications/generate_api_key');

//public endpoints
require('./api/public/list');
require('./api/public/last');

//check access to endpoints for user token
require('./api_access/user/profile/get');
require('./api_access/user/profile/change_password');
require('./api_access/user/applications/create');
require('./api_access/user/applications/list');
require('./api_access/user/applications/get');
require('./api_access/user/applications/update');
require('./api_access/user/applications/delete');
require('./api_access/user/applications/generate_api_key');
require('./api_access/user/sensors/list');
require('./api_access/user/sensors/get');
require('./api_access/user/sensors/update');
require('./api_access/user/measurements/list');
require('./api_access/user/measurements/last');
require('./api_access/user/measurements/list_sensor');
require('./api_access/user/measurements/last_sensor');
require('./api_access/user/applications/applications/get');
require('./api_access/user/applications/applications/update');
require('./api_access/user/sensor_alerts/create');
require('./api_access/user/sensor_alerts/list');
require('./api_access/user/sensor_alerts/get');
require('./api_access/user/sensor_alerts/update');
require('./api_access/user/sensor_alerts/delete');
require('./api_access/user/alerts/last')

//check access to endpoint for application token
require('./api_access/application/profile/get');
require('./api_access/application/profile/change_password');
require('./api_access/application/applications/list');
require('./api_access/application/applications/get');
require('./api_access/application/applications/update');
require('./api_access/application/applications/delete');
require('./api_access/application/applications/generate_api_key');
require('./api_access/application/sensors/list');
require('./api_access/application/sensors/get');
require('./api_access/application/sensors/update');
require('./api_access/application/measurements/list');
require('./api_access/application/measurements/last');
require('./api_access/application/measurements/list_sensor');
require('./api_access/application/measurements/last_sensor');
require('./api_access/application/applications/applications/get');
require('./api_access/application/applications/applications/update');
require('./api_access/application/sensor_alerts/create');
require('./api_access/application/sensor_alerts/list');
require('./api_access/application/sensor_alerts/get');
require('./api_access/application/sensor_alerts/update');
require('./api_access/application/sensor_alerts/delete');
require('./api_access/application/alerts/last');