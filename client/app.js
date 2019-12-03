var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var IndexRouter = require('./routes/index');
const port = 3000;

var app = express();

/* View engine setup */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* SASS middleware that takes our SCSS file and convert it to a CSS file */ 
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false // true = .sass and false = .scss
}));

app.use(express.static(path.join(__dirname, 'public')));


/* Import client routes */ 
var IndexRouter = require('./routes/index');

/* Setting client to use our routes */ 
app.use('/',IndexRouter);

app.listen(port, () => console.log(`Client listening on port ${port}!`))



module.exports = app;
