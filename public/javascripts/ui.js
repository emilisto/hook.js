

var view = {};

view['childHook'] = function () {
  $('.content').append('<pre class="well"></pre>');  
};


var Hook = require('/hook.js').Hook;
var hook = new Hook();
var channel = window.location.hash.substr(1);
var hooks = {};

$(function () {

  // Should get a query response, right?
  hook.on('**::query::result', function (data) {
    console.log(data);
  });

  // Emits a query event, should get "query::result" events.
  hook.on('hook::ready', function () {
    hook.emit("query", { "type": "hook" });
  });

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

  hook.connect();


  // Event stream
  hook.onAny( function (data) {
    var parts = this.event.split('::'),
        logs = $('#pipe')[0].children[0],
        maxLength = 30;

    if ( (channel.length && parts[1]==channel)
      || (!channel.length && parts.indexOf('browser') === -1 ) ) {

      // Remove the headers.
      try {
        $('#pipe > :first > :first').remove();
      } catch (e) {
        // Special case where there is no element to remove
      }

      // Prepend the new value.
      $('#pipe').prepend('<tr><td style="width: 200px;">'
 + $('<span>').text(this.event).text() + '</td><td>' + truncate(JSON.stringify(data), 80) + '</td></tr>');

      // Add the headers back on
      $('#pipe').prepend('<tr><th>Event:</th><th>Data:</th></tr>');

      // Pop off the last element if necessary
      if (logs && (logs.children.length > maxLength)) {
        logs.removeChild(logs.children[maxLength]);
      }
    }
  });
});
