#!/usr/bin/env node

'use strict';

var program = require('commander'),
    request = require('request'),
    util = require('util'),
    config = require('./config.js'),
    i,
    url,
    aService;

program
    .version('0.0.1')
    .option('-H, --host [hostname]', 'host, \'localhost\' by default', config.host ||'localhost')
    .option('-P, --port [number]', 'port, 3001 by default', config.port || 3001, parseInt)
    .option('-S, --size [name]', 'service size, \'HA\' by default', 'HA')
    .option('-T, --tag [name]', 'version, \'v1.6\' by default', 'v1.6')
    .option('-D, --description [string]', 'service description, \'new service\' by default', 'new service')
    .option('-U, --user [name]', 'user, \'testuser\' by default', config.user || 'testuser')
    .option('-C, --deploycfg [string]', 'deployment configuration repository , ' +
        '\'git@pdihub.hi.inet:TDAF/tdaf-rush.git\' by default', 'git@pdihub.hi.inet:TDAF/tdaf-rush.git')
    .option('-R, --repository [name]', 'repository, \'https://github.com/telefonicaid/Rush.git\' by default',
        'https://github.com/telefonicaid/Rush.git')
    .option('-X, --secure', 'use HTTPS', false)
    .parse(process.argv);
url = util.format('%s://%s:%d/service', program.secure ? 'https' : 'http', program.host, program.port);
aService = {
  name: program.args[0],
  versions: program.tag.split(",").map(function(x) {return x.trim()}),
  sizes: program.size.split(",").map(function(x) {return x.trim()}),
  description: program.description,
  owner: program.user,
  repository: program.repository
};
if (program.deploycfg) {
  aService.deployRepo = program.deploycfg
}

program.password("LDAP password: ","*", function (passwd) {
  makeRequest(passwd);
})
function makeRequest(passwd) {
  console.log('url\n', url);
  console.log('service\n', aService);
  request.post({
    url: url,
    json: aService,
    'auth': {
      'user': program.user,
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

