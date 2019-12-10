const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fetch = require('node-fetch');


fetch("http://localhost:5000/api/profiles")
.then(r =>  r.json().then(data => ({status: r.status, body: data})))
.then(function(obj){
    console.log(obj.body.profilePicture);
    router.get('/profile', function(req, res, next) {
        res.render('profile', {defaultPicture: 'uploads/defaultPicture.png', file: obj.body.profilePicture});
        next();
      });
});


//Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
})

//Init upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000}
}).single('profilePicture');


router.post('/upload', function(req, res, next) {
    upload(req, res, (err) => {
        if(err){
            console.log(err);
            res.render('profile', {
                msg: err,
                defaultPicture: 'uploads/defaultPicture.png'
            });
        } else{
            if(req.file == undefined){
                res.render('profile', {
                    defaultPicture: 'uploads/defaultPicture.png'
                });
            } else{
                const profile = {
                    name: 'byid',
                    profilePicture: `uploads/${req.file.filename}`
                }
                
                const option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
                };
                
                fetch("http://localhost:5000/api/profiles", option)
                .then(r =>  r.text().then(data => ({status: r.status, body: data})))
                .then(function(data){
                });
                console.log(`uploads/${req.file.filename}`);
                res.render('profile', {
                    defaultPicture: 'uploads/defaultPicture.png',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});


router.post('/delete', function(req, res, next){
    const profile = {
        profilePicture: 'uploads/defaultPicture.png'
    }
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
        };
        
        fetch("http://localhost:5000/api/profiles/delete", option)
        .then(r =>  r.text().then(data => ({status: r.status, body: data})))
        .then(function(data){
        });
    res.render('profile', {
        defaultPicture: 'uploads/defaultPicture.png'
    })
})

module.exports = router;