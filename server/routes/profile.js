const express = require ('express');
const router = express.Router();
const Profile = require('../models/profileModel');

router.get('/profiles', function(req, res, next){
    Profile.findOne().then(function(profile){
        res.send(profile);
    }).catch(next);
});

/*router.post('/profiles', function(req, res, next){
    Profile.create(req.body).then(function(profile){
        res.send(profile);
    }).catch(next);
});*/

/*router.post('/profiles', function(req, res, next){
    Profile.findByIdAndUpdate({_id: '5dee072ce810bf0f5bc42e7b'}, req.body).then(function(profile){
        res.send(profile);
    }).catch(next);
})*/

router.post('/profiles', function(req, res, next){
    Profile.findByIdAndUpdate({_id: '5dee07d5e810bf0f5bc42e7d'}, req.body).then(function(){
    Profile.findOne({_id: '5dee07d5e810bf0f5bc42e7d'}).then(function(profile){
        console.log(req.body.profilePicture);
        res.send(profile);
    });
}).catch(next);
})

router.post('/profiles/delete', function(req, res, next){
    Profile.findOneAndUpdate(req.body).then(function(profile){
        res.send(profile);
    }).catch(next);
});



router.put('/profiles/:id', function(req, res, next){
    Profile.findOneAndUpdate(req.body).then(function(profile){
        res.send(profile);
    }).catch(next);
});

router.delete('/profiles/:id', function(req, res, next){
    Profile.findByIdAndDelete({_id: req.params.id}).then(function(profile){
        res.send(profile);
    }).catch(next);
});

module.exports = router;