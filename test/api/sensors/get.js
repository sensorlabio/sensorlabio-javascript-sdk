let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let Api = require('../../../api');

//@todo change url to real public test server
let api = new Api('http://localhost:3000/api/v1'); //we must test on test server only

let test_email = 'test@sensorlab.io';
let test_passw = 'test';

describe('Sensors endpoint', () => {

});