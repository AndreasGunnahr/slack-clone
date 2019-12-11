var express = require('express');
var router = express.Router();
<<<<<<< HEAD
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

=======
const fetch = require('node-fetch');

/* GET chat view/page. */
router.get('/', async function(req, res, next) {
    const id = req.session.activeUser.id;
    const responseChannels = await fetch('http://localhost:5000/channels/' + id )
    const dataChannels = await responseChannels.json()
    res.render('chat', {
        username: req.session.activeUser.username, 
        channels: dataChannels,
        error: req.session.error,
        status: req.session.status || true
     });
});

/* Create a new Channel route */ 
router.post('/new-channel', function (req, res, next) {
    const newChannel = {
       createdByUserID: req.session.activeUser.id,
       name: req.body.name,
       description: req.body.description
    }

    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newChannel) 

    };
    
    fetch("http://localhost:5000/channels/new-channel", option)
    .then(response => {
        response.json().then(function(data) {
            if(data.status){
                res.redirect('/chat');
            }else{
               res.redirect('/chat');
            }
        });
    });
});
>>>>>>> 10ada12b78a6a857a4849f2fa4e5ceeeca21c179


module.exports = router;
