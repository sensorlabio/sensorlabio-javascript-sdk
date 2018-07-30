process.env.TEST_REST_API_URL = 'http://localhost:3000/api';

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
require('./api/measurements/list');
require('./api/measurements/last');
require('./api/measurements/list_sensor');
require('./api/measurements/last_sensor');

//application auth
require('./api/auth/application_token');

//application token access endpoints
require('./api/applications/sensors/list');
require('./api/applications/sensors/get');
require('./api/applications/sensors/update');
require('./api/applications/measurements/list');
require('./api/applications/measurements/last');
require('./api/applications/measurements/list_sensor');
require('./api/applications/measurements/last_sensor');
require('./api/applications/applications/get');
require('./api/applications/applications/update');
require('./api/applications/applications/generate_api_key');