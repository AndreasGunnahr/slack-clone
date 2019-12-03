var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 4000;

const users = {};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', function (socket) {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
      })
      socket.on('send', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
      })
      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
      });
    console.log('a user connected');
});


http.listen(port, function () {
    console.log('listening on port 4000');
});