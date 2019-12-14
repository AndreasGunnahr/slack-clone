const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;
const bodyParser = require('body-parser')
const http = require('http').createServer(app);



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/* Setup mongoose/mongoDB connection */ 
mongoose.connect("mongodb+srv://ydehed:Balto123@slack-project-wdtda.gcp.mongodb.net/Slack-clone?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(err => console.log(`Failed to connect to database - Error: ${err.message}`));


/* Import server/API routes */

const ChatMessage = require('./routes/chatConnection');


/* Setting server to use our API routes */ 
// app.use('/login',validateLoginRouter); 
// app.use('/register', validateRegisterRouter);
app.use('/chat', ChatMessage)
 



http.listen(port, () => console.log(`Client listening on port ${port}!`));

module.exports = app;
