var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


/* GET chat page. */
router.get('/', function(req, res, next) {
    const signedInUser = req.session.activeUserInfo;
    res.render('chat', {username: "Ydehed"}) //signedInUser.username});
});



const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id])
      delete users[socket.id]
    })
  })



module.exports = router;
