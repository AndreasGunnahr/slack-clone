var express = require("express");
var path = require('path');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var ejs = require("ejs");
var port = 4000;
const bodyParser = require('body-parser')

const users = {};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('name');
});

app.get('/chat', function (req, res) {
    res.render('index');
});

app.post('/chat', function (req, res) {
    var nameVal = req.body.nameVal;
    res.render("index", {nameVal: nameVal});
});

app.post('/chat', function (req, res) {
    var msgVal = req.body.msgVal;
    res.render("index", {msgVal: msgVal});
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
    console.log( 'a user connected');
});


http.listen(port, function () {
    console.log('listening on port 4000');
});