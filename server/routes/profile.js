const express = require ('express');
const router = express.Router();
const Profile = require('../models/profileModel');

router.get('/profiles', function(req, res, next){
    Profile.findOne().then(function(profile){
        res.send(profile);
    }).catch(next);
});

router.post('/profiles', function(req, res, next){
    Profile.create(req.body).then(function(profile){
        res.send(profile);
    }).catch(next);
});

router.put('/profiles/:id', function(req, res, next){
    Profile.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Profile.findOne({_id: req.params.id}).then(function(profile){
            res.render('profile', {profile: profile});
        });
    }).catch(next);
});

router.delete('/profiles/:id', function(req, res, next){
    Profile.findByIdAndDelete({_id: req.params.id}).then(function(profile){
        res.send(profile);
    }).catch(next);
});

module.exports = router;