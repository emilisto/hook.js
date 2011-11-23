

var view = {};

view['childHook'] = function () {
$('.content').append('<pre class="well"></pre>');  
};



var hook = new Hook();

hook.on('ready', function(){
  console.log('now the hook is ready')
});

hook.connect();

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

