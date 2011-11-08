
var Hook = require('hook.io-webserver').Webserver,
    http = require('http'),
    util = require('util');

var Core = exports.Core = function(options){

  Hook.call(this, options);

  var self = this;

  var channels = [];



};

// Core inherits from Hook
util.inherits(Core, Hook);
