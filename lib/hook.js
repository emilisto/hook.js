
var Hook = require('hook.io-webserver').Webserver,
    http = require('http'),
    util = require('util');

var Core = exports.Core = function(options){

  Hook.call(this, options);

  var self = this;

  var channels = [];

  //
  // Child hooks which we will spawn up
  //
  self.hooks = ["webhook"];

  self.onAny(function(data){
    var parts = this.event.split('::');

    if (channels.indexOf(parts[0])!=-1) {
      self.sendToBrowser('browser::' + this.event, data);
    }
  });

  self.on('channel', function(data){
    channels.push(data);
  });

};

// Core inherits from Hook
util.inherits(Core, Hook);
