var express = require('express')
var router = express.Router()

/* Import database models */ ;
const Channels = require('../models/channels')
const Messages = require('../models/messages')

router.post('/new', function(req,res,next){
    try{
        let newMessage = new Messages(req.body); 
        newMessage.save(function(err, messageObject){
            if(err){
                res.status(500).send()
            }
            let id = messageObject._id;
            res.status(200).json({data: 'Message stored', id: id});
        });
    }catch{
        res.status(500).send()
    } 
});

router.put('/edit/:id', function(req,res,next){
    let messageID = req.params.id;
    try{
       Messages.updateOne({_id: messageID},{$set: {text: req.body.text}}, function(err, messageObject){
            if(err){
                res.status(500).send()
            }
            res.status(200).json({data: 'Updated'});
       });
    }catch{

    }
})

module.exports = router;