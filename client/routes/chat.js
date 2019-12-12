var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET chat view/page. */
router.get('/', async function(req, res, next) {
    const id = req.session.activeUser.id;
    const responseChannels = await fetch('http://localhost:5000/channels/' + id )
    const allChannels = await responseChannels.json()
    const responseDirectMessage = await fetch('http://localhost:5000/channels/directMessage/' + id )
    const allDirectMessage = await responseDirectMessage.json()
    const responseUsers = await fetch('http://localhost:5000/users');
    const allUsers = await responseUsers.json()
    res.render('chat', {
        username: req.session.activeUser.username, 
        channels: allChannels,
        directMessages: allDirectMessage,
        allUsers: allUsers,
     });
});

router.post('/check-new-channel', function (req, res, next) {
    const searchValue = {
        createdByUserID: req.session.activeUser.id,
        channelSearchValue: req.body.searchChannel
    }
    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(searchValue) 

    };
    
    fetch("http://localhost:5000/channels/check-new-channel", option)
    .then(response => {
        response.json().then(function(data) {
            res.send(data);
        });
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
    body: JSON.stringify(channelSearchValue) 

    };
    
    fetch("http://localhost:5000/channels/new-channel", option)
    .then(response => {
        response.json().then(function(data) {
            if(data.status){
                res.redirect('/chat');
            }
        });
    });
});

/* Create a new Direct Message route */ 
router.post('/new-directMessage', function (req, res, next) {
    const clickedUser = {
        createdByUserID: req.session.activeUser.id,
        selectedUserID: req.body.id,
        username:  req.body.username
    }
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clickedUser)
    
    };
        
    fetch("http://localhost:5000/channels/new-directMessage", option)
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



module.exports = router;
