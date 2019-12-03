var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 4000;

const users = {};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/whaddap', function (req, res) {
    res.send("whatsupp");
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

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port, function () {
    console.log('listening on port 4000');
});