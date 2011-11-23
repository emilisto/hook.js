

var view = {};

view['childHook'] = function () {
  $('.content').append('<pre class="well"></pre>');  
};


var Hook = require('/hook.js').Hook;
var hook = new Hook();
var channel = window.location.hash.substr(1);
var hooks = {};

$(function () {

  // Register available hooks
  hook.on('*::hook::ready', function (data) {
    hooks[data.name] = $('<li id="#'+data.name+'">'+data.name+'</li>');

    $('#interfaces').append(hooks[data.name]);
  });

  hook.on('hook::disconnected', function (name) {
    hooks[name].remove();
  });

  // A formatting function
  var truncate = function (str, n) {
    if (typeof str === "string") {
      if (str.length < n) {
        return str;
      }
      else {
        return str.substring(0, n-3)+'...';
      }
    }
    else {
      return str;
    }
  }

  // Add channel name
  $('#channel').text(channel.length ? ' (Channel `' + channel +'`)' : '');

  // Notice for when hook starts
  hook.on('ready', function(){
    console.log('now the hook is ready')
  });

  hook.connect();


  // Event stream
  hook.onAny( function (data) {
    var parts = this.event.split('::'),
        logs = $('#pipe')[0].children[0],
        maxLength = 30;

    if ( (channel.length && parts[1]==channel)
      || (!channel.length && parts.indexOf('browser') === -1 ) ) {

      $('#pipe').prepend('<tr><td style="width: 400px;"><strong style="color: #f0f">Event: </strong>' + this.event + '</td><td><strong style="color: #444">Data: </strong>' + truncate(JSON.stringify(data), 80) + '</td></tr>');

      if (logs && (logs.children.length > maxLength)) {
        logs.removeChild(logs.children[maxLength]);
      }
    }
  });
});
