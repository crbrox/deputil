var
    request = require('request'),
    util = require('util'),
    config = require('./config.js');


function options(program) {
  program
      .version('0.0.1')
      .option('-H, --host [hostname]', 'host, \'localhost\' by default', config.host || 'localhost')
      .option('-P, --port [number]', 'port, 3001 by default', config.port || 3001, parseInt)
      .option('-U, --user [name]', 'user, \'testuser\' by default', config.user || 'testuser')
      .option('-X, --secure', 'use HTTPS', false)
}

function makeRequest(method, path, data, program) {
  var url = util.format('%s://%s:%d/%s', program.secure ? 'https' : 'http', program.host, program.port, path);
  program.password("LDAP password: ", "*", function (passwd) {
    console.log('url\n', url);
    console.log('data\n', data);
    request[method]({url: url, json: data, 'auth': {
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
  });
}
exports.options = options;
exports.makeRequest = makeRequest;
exports.makePost = makeRequest.bind({},"post")
exports.makeGet = makeRequest.bind({},"get")
exports.makeDel = makeRequest.bind({},"del")
