

var view = {};

view['childHook'] = function () {
$('.content').append('<pre class="well"></pre>');  
};



var Hook = require('/hook.js').Hook;
var hook = new Hook();
var channel = window.location.hash.substr(1);

hook.on('ready', function(){
  

});

hook.onAny(function(data){
  var parts = this.event.split('::');

  console.log(data, parts);

  if (parts[1]==channel) {
    $('#channel').prepend('<li>' + this.event + '</li>');
  }

  if (parts.indexOf('browser') === -1) {
    $('#pipe').prepend('<li>' + this.event + '</li>');
  }
});



hook.connect();