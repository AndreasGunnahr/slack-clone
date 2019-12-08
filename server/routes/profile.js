const express = require ('express');
const router = express.Router();
const Profile = require('../models/profileModel');

// get a list of ninjas from the db
router.get('/profiles', function(req, res, next){
    res.send('type: GET');
});

// add a new ninja to the db
router.post('/profiles', function(req, res, next){
    Profile.create(req.body).then(function(profile){
        res.send(profile);
    }).catch(next);
});

// update a ninja in the db
router.put('/profiles/:id', function(req, res, next){
    Profile.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Profile.findOne({_id: req.params.id}).then(function(profile){
            res.render('profile', {profile: profile});
        });
    }).catch(next);
});

// delete a ninja from the db
router.delete('/profiles/:id', function(req, res, next){
    Profile.findByIdAndDelete({_id: req.params.id}).then(function(profile){
        res.send(profile);
    }).catch(next);
});

module.exports = router;