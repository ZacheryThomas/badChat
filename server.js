var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/js/chat_client.js', function(req, res){
    res.sendfile('./js/chat_client.js');
});

app.get('/js/random_emoji.js', function(req, res){
  res.sendfile('./js/random_emoji.js');
});

app.get('/css/style.css', function(req, res){
    res.sendfile('./css/style.css');
});

var connections = 0
io.on('connection', function(socket){
  console.log('user connected');
  connections++;

  io.emit('num connections', connections);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    connections--;

    io.emit('num connections', connections);
  });
});

http.listen(80, function(){
  console.log('listening on *:80');
});