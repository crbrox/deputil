#!/usr/bin/env node

'use strict';

var program = require('commander'),
    common = require('./common'),
    path,
    url,
    aDeployment;

common.options(program);
program
    .option('-S, --size [name]', 'deployment size, \'HA\' by default', 'HA')
    .option('-T, --tag [name]', 'version, \'v1.6\' by default', 'v1.6')
    .option('-D, --description [string]', 'deployment description, \'new deployment\' by default', 'new deployment');
program.parse(process.argv);
path = 'deployment';
aDeployment = {
  service: program.args[0],
  version: program.tag,
  size: program.size,
  description: program.description,
  owner: program.user
};

common.makePost(path, aDeployment, program);
