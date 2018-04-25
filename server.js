var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res){
  res.sendfile('index.html');
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

server.listen(80, function(){
  console.log('listening on *:80');
});