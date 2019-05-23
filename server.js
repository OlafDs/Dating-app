const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const createError = require('http-errors');

const app = express();
const port = 3000;


// view engine setup
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index' , {
    title: 'EJS title'
  });
});

//Forms
app.post('/', add)
app.length('/add', form)

// If port 3000 is okay, show console.log
app.listen(3000, function(){
  console.log('Server start on Port 3000!')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

