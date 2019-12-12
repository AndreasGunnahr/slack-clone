const express = require('express');
const path = require('path');
const cors = require('cors');
const port = 3000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var flash = require('connect-flash');

/* View engine setup */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(flash());
app.use(session({secret: 'mySecret', 
  resave: true, 
  saveUninitialized: true,
  // cookie: {
  //   maxAge: 24 * 60 * 60 * 1000
  // }
  }));
/* SASS middleware that takes our SCSS file and convert it to a CSS file */ 
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false // true = .sass and false = .scss
}));

app.use(express.static(path.join(__dirname, 'public')));
/* Import client routes */ 
var IndexRouter = require('./routes/index');
var LoginRouter = require('./routes/login');
var RegisterRouter = require('./routes/register');
var ChatRouter = require('./routes/chat');
// var CreateChannelRouter = require('./routes/createChannel');
// var CreateDirectMessageRouter = require('./routes/createDirectMessage');


/* Setting client to use our routes */ 
app.use('/', IndexRouter);
app.use('/chat', ChatRouter);
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);
// app.use('/chat/new-directMessage', CreateDirectMessageRouter);



// users = {};
/* Settings for our socket.io connection */ 
// io.on('connection', function (socket) {
//   socket.on('new-user', name => {
//       users[socket.id] = name;
//       socket.broadcast.emit('user-connected', name);
//     })
//     socket.on('send', message => {
//       socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
//     })
//     socket.on('disconnect', () => {
//       socket.broadcast.emit('user-disconnected', users[socket.id]);
//       delete users[socket.id];
//     });
//   console.log( 'a user connected');
// });


http.listen(port, () => console.log(`Client listening on port ${port}!`));



module.exports = app;
