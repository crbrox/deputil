#!/usr/bin/env node

'use strict';

var program = require('commander'),
    request = require('request'),
    util = require('util'),
    i,
    url,
    aDeployment;

program
    .version('0.0.1')
    .option('-H, --host [hostname]', 'host, \'localhost\' by default', 'localhost')
    .option('-P, --port [number]', 'port, 3001 by default', 3001, parseInt)
    .option('-N, --name [name]', 'deployment service, \'testing\' by default', 'testing')
    .option('-S, --size [name]', 'deployment size, \'HA\' by default', 'HA')
    .option('-T, --tag [name]', 'version, \'v1.6\' by default', 'v1.6')
    .option('-D, --description [string]', 'deployment description, \'new deployment\' by default', 'new deployment')
    .option('-O, --owner [name]', 'owner, \'testuser\' by default', 'testuser')
    .option('-X, --secure', 'use HTTPS', false)
    .parse(process.argv);
url = util.format('%s://%s:%d/deployment', program.secure ? 'https' : 'http', program.host, program.port);
aDeployment = {
  service: program.name,
  version: program.tag,
  size: program.size,
  description: program.description,
  owner: program.owner
};
program.password("LDAP password: ", "*", function (passwd) {
  makeRequest(passwd);
})
function makeRequest(passwd) {
  console.log('url\n', url);
  console.log('deployment\n', aDeployment);
  request.post({url: url, json: aDeployment, 'auth': {
    'user': aDeployment.owner,
    'pass': passwd,
    'sendImmediately': true
  }}, function (err, res, body) {
    if (err) {
      console.log('error\n', err);
    }
    else {
      console.log('statusCode\n', res.statusCode);
      console.log('headers\n', res.headers);
      console.log('body\n', body);
    }
  });
}
function range(val) {
  return val.split('..').map(Number);
}
function list(val) {
  return val.split(',');
}

