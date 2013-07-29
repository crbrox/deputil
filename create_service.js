#!/usr/bin/env node

'use strict';

var program = require('commander'),
    common = require('./common'),
    config = require('./config.js'),
    path,
    aService;

common.options(program);
program
    .option('-S, --size [name]', 'service size list, \'HA\' by default', 'HA')
    .option('-T, --tag [name]', 'version, \'v1.6\' by default', 'v1.6')
    .option('-D, --description [string]', 'service description, \'new service\' by default', 'new service')
    .option('-C, --deploycfg [string]', 'deployment configuration repository , ' +
        '\'git@pdihub.hi.inet:TDAF/tdaf-rush.git\' by default', 'git@pdihub.hi.inet:TDAF/tdaf-rush.git')
    .option('-R, --repository [name]', 'repository, \'https://github.com/telefonicaid/Rush.git\' by default',
        'https://github.com/telefonicaid/Rush.git')
    .parse(process.argv);
path = 'service';
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
common.makePost(path, aService, program);
