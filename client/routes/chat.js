var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET chat view/page. */
router.get('/', async function(req, res, next) {
    const id = req.session.activeUser.id;
    const responseChannels = await fetch('http://localhost:5000/channels/' + id )
    const allChannels = await responseChannels.json()
    const responseUsers = await fetch('http://localhost:5000/users');
    const allUsers = await responseUsers.json()
    res.render('chat', {
        username: req.session.activeUser.username, 
        channels: allChannels,
        allUsers: allUsers,
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

/* Create a new Direct Message route */ 
router.get('/new-directMessage', function (req, res, next) {
    console.log(req.body)
    res.redirect('/chat');
    
});



module.exports = router;
