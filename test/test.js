process.env.TEST_REST_API_URL = 'http://localhost:3000/api/v1';

require('./api/users/reset_password');
require('./api/auth/token');
require('./api/profile/get');
require('./api/profile/change_password');
require('./api/sensors/list');
require('./api/sensors/get');
require('./api/measurements/list');
require('./api/measurements/last');
require('./api/measurements/list_sensor');
require('./api/measurements/last_sensor');