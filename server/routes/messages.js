var express = require('express')
var router = express.Router()

/* Import database models */ ;
const Channels = require('../models/channels')
const Messages = require('../models/messages')

/* GET all Direct Messages information from each user ID. */
router.get('/:id', function (req, res, next){
    const userID = req.params.id;
    Messages.find({createdByUserID: userID}, function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else{
            res.send(data);
        }
    });
});

