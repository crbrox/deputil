#!/usr/bin/env node

'use strict';

var program = require('commander'),
    common = require('./common'),
    util = require('util'),
    path;

common.options(program);
program.parse(process.argv);
common.makeGet('service', null, program);

