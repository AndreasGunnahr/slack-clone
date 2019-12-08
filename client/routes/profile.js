const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


fetch("http://localhost:5000/login", option)
    .then(response => {
        response.json().then(function(data) {
            
            if(data.status){
                req.session.activeUserInfo = data;
                res.redirect('/dashboard');
            }else{
                req.session.error = data.error;
                res.redirect('/');
            }
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


router.get('/profile', function(req, res, next) {
  res.render('profile', {defaultPicture: 'uploads/defaultPicture.png'});

  next();
});

router.post('/upload', function(req, res, next) {
    upload(req, res, (err) => {
        if(err){
            res.render('profile', {
                msg: err
            });
        } else{
            if(req.file == undefined){
                res.render('profile', {
                    defaultPicture: 'uploads/defaultPicture.png'
                });
            } else{
                console.log(`uploads/${req.file.filename}`);
                res.render('profile', {
                    defaultPicture: 'uploads/defaultPicture.png',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

module.exports = router;