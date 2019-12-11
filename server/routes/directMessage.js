var express = require('express')
var router = express.Router()


/* Import database models */ 
// const Messages = require('../models/messages')

/* GET all Direct Messages information */
// router.get('/:id', function (req, res, next){
//     const userID = req.params.id;
//     Channels.find({createdByUserID: userID}, function(err, data) {   
//         if(err){
//             res.status(500).send();
//         }
//         else{
//             res.send(data);
//         }
//     });
// });

/* POST new Channel information and checking if the Channel is valid. */
router.post('/new', function (req, res, next) {
    res.send()
});