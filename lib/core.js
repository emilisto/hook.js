
var Hook = require('hook.io').Hook,
    http = require('http'),
    util = require('util');

var Core = exports.Core = function(options){

  Hook.call(this, options);

  var self = this;


  //
  // Child hooks which we will spawn up
  //
  self.hooks = [
    "webhook", 
    {
      "type": "webserver",
      "name": "webserver",
      "webroot": self.webroot
    }
  ];

};

// Core inherits from Hook
util.inherits(Core, Hook);