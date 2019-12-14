const express = require('express');
const router = express.Router();

const chatMessage = require('../models/messages');


router.post('/', function(req , res, next){
  let newMessage = new chatMessage(req.body)
  newMessage.save(function(err, messageObject){
      if(err){
        res.status(500).send()
      }
      res.status(200).json("Message Stored!");
  })
  
  // chatMessage.find({} ,function(err, data){
  //   if(err){
  //     res.send()
  //   }else{
  //     res.json({data});
  //   }
  // })
})

module.exports = router;


