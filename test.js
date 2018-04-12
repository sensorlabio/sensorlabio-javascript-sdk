var api = require('./api');

var slab_api = new api();

var email_ver_token = 'ebd9db1d329fb41f00bbb2abcd87750bdacdcb1c539ad5283422478b8f168f2ce2b3f9435feaee50d8bd7f2bbddb2d15d71885dc88a6164b0a25797786048492';
var pass_reset_token = 'e4c85786373a5df1fb83f5babf91fa97ec290739fd1fd6a12831671d1caad0c8e72ee38b1b31d688f16cd4c5f1dc44049d8de15bfd1994774e75e10ce6d3531b';

/*
slab_api.users.signup('testemail@email.com', 'test', 'test').then(function(response) {
    console.log('Sign up response');
    console.log(response);
}).catch(function(response) {
    console.log('Sign up error');
    console.log(response);
});

slab_api.users.verify_email(email_ver_token).then(function(response) {
    console.log('Verify email response');
    console.log(response);
}).catch(function(response) {
    console.log('Verify email error');
    console.log(response);
});

slab_api.users.reset_password_request('testemail@email.com').then(function(response) {
    console.log('Request password reset response');
    console.log(response);
}).catch(function(response) {
    console.log('Request password reset error');
    console.log(response);
});

slab_api.users.reset_password_check_token(pass_reset_token).then(function(response) {
    console.log('Password reset token check response');
    console.log(response);
}).catch(function(response) {
    console.log('Password reset token check error');
    console.log(response);
});

slab_api.users.reset_password(pass_reset_token, 'admin', 'admin').then(function(response) {
    console.log('Password reset token check response');
    console.log(response);
}).catch(function(response) {
    console.log('Password reset token check error');
    console.log(response);
});

slab_api.auth.token('testemail@email.com', 'admin').then(function(response) {
    console.log('Password reset token check response');
    console.log(response);
}).catch(function(response) {
    console.log('Password reset token check error');
    console.log(response);
});
*/
/*
slab_api.profile.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM1Yzc4OGQyODFiYTA1ZDg0OTMwNzgiLCJpYXQiOjE1MjI5MTUyNzMsImV4cCI6MTUyMzAwMTY3M30.BODwPKtRxDLNL9WL3HTijZKIxC8wnXP6s71Geazci_A').then(function(response) {
    console.log('Profile response');
    console.log(response);
}).catch(function(response) {
    console.log('Profile error');
    console.log(response);
});
*/

/*
slab_api.profile.change_password('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM1Yzc4OGQyODFiYTA1ZDg0OTMwNzgiLCJpYXQiOjE1MjI5MTUyNzMsImV4cCI6MTUyMzAwMTY3M30.BODwPKtRxDLNL9WL3HTijZKIxC8wnXP6s71Geazci_A', 'admin', 'password', 'password').then(function(response) {
    console.log('Profile response');
    console.log(response);
}).catch(function(response) {
    console.log('Profile error');
    console.log(response);
});
*/

/*
slab_api.sensors.list('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMzRiMWRmMGFmMTExZTRhMzExMDEiLCJpYXQiOjE1MjI5MTcxODEsImV4cCI6MTUyMzAwMzU4MX0.1BPGCuXlXfzYiRKq6IatraaNz66QVSpybHrGd73Cjko').then(function(response) {
    console.log('Sensors List');
    console.log(response);
}).catch(function(response) {
    console.log('Sensors List error');
    console.log(response);
});
*/

/*
slab_api.sensors.one('5aba2e0a02d93e2684381734_11', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMzRiMWRmMGFmMTExZTRhMzExMDEiLCJpYXQiOjE1MjI5MTcxODEsImV4cCI6MTUyMzAwMzU4MX0.1BPGCuXlXfzYiRKq6IatraaNz66QVSpybHrGd73Cjko').then(function(response) {
    console.log('Sensor');
    console.log(response);
}).catch(function(response) {
    console.log('Sensor error');
    console.log(response);
});
*/

/*
slab_api.measurements.list('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMzRiMWRmMGFmMTExZTRhMzExMDEiLCJpYXQiOjE1MjI5MTcxODEsImV4cCI6MTUyMzAwMzU4MX0.1BPGCuXlXfzYiRKq6IatraaNz66QVSpybHrGd73Cjko').then(function(response) {
    console.log('Sensor');
    console.log(response);
}).catch(function(response) {
    console.log('Sensor error');
    console.log(response);
});
*/

/*
slab_api.measurements.last('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMzRiMWRmMGFmMTExZTRhMzExMDEiLCJpYXQiOjE1MjI5MTcxODEsImV4cCI6MTUyMzAwMzU4MX0.1BPGCuXlXfzYiRKq6IatraaNz66QVSpybHrGd73Cjko', 'HUM').then(function(response) {
    console.log('Sensor');
    console.log(response);
}).catch(function(response) {
    console.log('Sensor error');
    console.log(response);
});
*/

/*
 slab_api.measurements.list('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMzRiMWRmMGFmMTExZTRhMzExMDEiLCJpYXQiOjE1MjI5MTcxODEsImV4cCI6MTUyMzAwMzU4MX0.1BPGCuXlXfzYiRKq6IatraaNz66QVSpybHrGd73Cjko', '5aba2e0a02d93e2684381732_00').then(function(response) {
 console.log('Sensor');
 console.log(response);
 }).catch(function(response) {
 console.log('Sensor error');
 console.log(response);
 });

 slab_api.measurements.last('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMzRiMWRmMGFmMTExZTRhMzExMDEiLCJpYXQiOjE1MjI5MTcxODEsImV4cCI6MTUyMzAwMzU4MX0.1BPGCuXlXfzYiRKq6IatraaNz66QVSpybHrGd73Cjko', '5aba2e0a02d93e2684381732_00', 'HUM').then(function(response) {
 console.log('Sensor');
 console.log(response);
 }).catch(function(response) {
 console.log('Sensor error');
 console.log(response);
 });
 */

slab_api.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWJhMzRiMWRmMGFmMTExZTRhMzExMDEiLCJpYXQiOjE1MjI5MTcxODEsImV4cCI6MTUyMzAwMzU4MX0.1BPGCuXlXfzYiRKq6IatraaNz66QVSpybHrGd73Cjko');

slab_api.sensors.one('5aba2e0a02d93e2684381732').then(function(sensor) {
    sensor.measurements.list().then(function(measurements) {

    });
    sensor.measurements.last('HUM').then(function(measurement) {
       measurement.sensor().then(function(sensor) {
         sensor.measurements.list().then(function(result) {
           console.log(result);
         });
       });
    });
});