#!/usr/bin/env node

'use strict';

var program = require('commander'),
    request = require('request'),
    util = require('util'),
    i,
    url,
    aService;

program
    .version('0.0.1')
    .option('-H, --host [hostname]', 'host, \'localhost\' by default', 'localhost')
    .option('-P, --port [number]', 'port, 3001 by default', 3001, parseInt)
    .option('-U, --user [name]', 'user, \'testuser\' by default', 'testuser')
    .option('-X, --secure', 'use HTTPS', false)
    .parse(process.argv);
url = util.format('%s://%s:%d/deployment/%s', program.secure ? 'https' : 'http', program.host, program.port, program.args[0]);
         console.log(url)

program.password("LDAP password: ","*", function (passwd) {
  makeRequest(passwd);
})
function makeRequest(passwd) {
  console.log('url\n', url);
  request.del({
    url: url,
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
