var express = require('express')
var router = express.Router()

/* Import database models */ ;
const Channels = require('../models/channels')

/* GET all Channels information */
router.get('/:id', function (req, res, next){
    const userID = req.params.id;
    Channels.find({createdByUserID: userID}, function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else{
            res.send(data);
        }
    });
});

/* POST new Channel information and checking if the Channel is valid. */
router.post('/new-channel', function (req, res, next) {
    const enteredChannelName = req.body.name;
    Channels.findOne({name: enteredChannelName }, async function(err, data) {   
        if(err){
            res.status(500).send();
        }
        else if(data == null) {
            try{
                let channel = new Channels(req.body);
                channel.save(function (err, channelObject) {
                    if (err){
                        res.status(500).send();
                    }
                });
                res.status(201).json({ status: true, success: "Channel created!" });
                console.log("CHANNEL MADE!")
            }catch{
                res.status(500).send();
            }
        }
        else{
            res.status(400).json({ status: false, error: "Channel name is already taken." });
        }
    });
});


module.exports = router