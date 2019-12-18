const express = require('express');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server)
const fetch = require("node-fetch")




/* GET chat page. */
router.get('/', function (req, res, next) {
  const signedInUser = req.body.username;
  res.render('chat', { username: "ydehed" })//signedInUser.username, message: message, time: time});

  //   const users = {};

  // io.on('connection', socket => {
  //   socket.on('new-user', name => {
  //     users[socket.id] = name
  //     socket.broadcast.emit('user-connected', name)
  //   })
  //   socket.on('send-chat-message', message => {

  //     socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })

  //   })
  //   socket.on('disconnect', () => {
  //     socket.broadcast.emit('user-disconnected', users[socket.id])
  //     delete users[socket.id]
  //   })


  // })

});





router.post('/new', function (req, res, next) {
  console.log(req.body)

  const messageObject = {
    channelID: '437469384738473894',
    name: req.body.name,
    time: req.body.time,
    text: req.body.message
  }
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(messageObject)
  }

  fetch('http://localhost:5000/chat', option)
    .then(response => response.json())
    .then(data => {

      console.log(data)
      res.send(data)
    })

    .catch(err => console.log(`Error: ${err}`));

})

module.exports = function(app) {

app.put('/chat/:id', chatMessage.update);


app.delete('/chat/:id', chatMessage.delete);

}

module.exports = router;