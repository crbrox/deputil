#!/usr/bin/env node

'use strict';

var program = require('commander'),
    common = require('./common'),
    util = require('util'),
    path;

common.options(program);
program.parse(process.argv);
path = util.format('deployment/%s', program.args[0]);

common.makeGet(path, null, program);