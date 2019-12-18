const express = require('express');
const router = express.Router();

const chatMessage = require('../models/messages');


router.post('/', function(req , res, next){
  console.log(req.body.data)
  try{
    let newMessage = new chatMessage(req.body)
    newMessage.save(function(err, messageObject){
      if(err){
        res.status(500).send()
      }
      res.status(200).json({data: "Message Stored!"});
    })
  }catch{
    res.status(500).send();
  }
})

// router.delete('/:id', (req, res, next => {
//     const id = req.params.id

//     chatMessage.findOneAndDelete({id}, (err, chatMessage) => {
//       if (err) {
//         res.status(400).json(err)
//       }
//       if (!chatMessage) {
//         res.status(404).json({ message: 'Message not found.' })
//       }
//       res.json({ message: `${chatMessage.id} deleted.` })
//     })
// }))

// router.put('/:id', (req, res, next => {
//     const id = req.params.id

//     chatMessage.findOneAndUpdate({id},
//       req.body,
//       {new: true},
//       (err, chatMessage) =>{
//         if(err){
//           res.status(400).json(err)
//         }
//           res.json(chatMessage)
//     })
// }))

module.exports = router;


