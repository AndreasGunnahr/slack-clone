const express = require('express');
const path = require('path');
const cors = require('cors');
const sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
const port = 3000;
var app = express();

/* View engine setup */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
/* SASS middleware that takes our SCSS file and convert it to a CSS file */ 
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false // true = .sass and false = .scss
}));

app.use(express.static(path.join(__dirname, 'public')));


/* Import client routes */ 
var IndexRouter = require('./routes/index');
<<<<<<< HEAD
var ProfileRouter = require('./routes/profile');

/* Setting client to use our routes */ 
app.use('/',IndexRouter);
app.use('/',ProfileRouter);
=======
var DashboardRouter = require('./routes/dashboard');
var LoginRouter = require('./routes/login');
var RegisterRouter = require('./routes/register');


/* Setting client to use our routes */ 
app.use('/', IndexRouter);
app.use('/login', LoginRouter);
app.use('/dashboard', DashboardRouter);
app.use('/register', RegisterRouter);

>>>>>>> master

app.listen(port, () => console.log(`Client listening on port ${port}!`))



module.exports = app;
