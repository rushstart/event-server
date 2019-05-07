var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/emit', function(req, res){
  io.to(req.query.room).emit('message', req.query.msg);
  res.send('');
});

io.on('connection', function(socket){
  var room = socket.handshake.query.room;
  socket.join(room);
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
