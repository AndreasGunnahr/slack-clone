const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/* Setup mongoose/mongoDB connection */ 
mongoose.connect('mongodb://localhost/profilego', {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(err => console.log(`Failed to connect to database - Error: ${err.message}`));


/* Import server/API routes */
const validateLoginRouter = require('./routes/validateLogin');
const validateRegisterRouter = require('./routes/validateRegister');

/* Import server/API routes */ 

/* Setting server to use our API routes */ 
// app.use()
app.use('/api', require('./routes/profile'));
app.use('/login',validateLoginRouter); 
app.use('/register', validateRegisterRouter);
 



app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
