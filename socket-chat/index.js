var express = require("express");
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 4000;

const users = {};

app.use(express.static(path.join(__dirname,'public')));



app.get('/', function (req, res) {
    res.render(__dirname + '/views/index.ejs');
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