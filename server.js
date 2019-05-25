const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const port = 3000
const expressValidator = require('express-validator');
//var mongojs = require('mongojs')
//var db = mongojs('datingapp', ['users'])

const app = express();

//view Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Body Parser Middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set Static path
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next){
  res.locals.errors = null
  next();
});

//Express Validator middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split(','),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


app.get("/", start)
app.get("/index", home)
app.get("/register", register)
app.get("/login", inloggen)
app.get("/explore", explore)


app.post('/', function (req, res) {
  res.send('Got a POST request')
})

function start(req, res) {
  res.render('pages/start.ejs', {
    title: "start"
  });
}

function register(req, res) {
  res.render('pages/register.ejs', {
    title: "register",
    users: users
  });
}
app.post('/users/add', function (req, res) {

  req.checkBody('name', 'Voornaam is verplicht').notEmpty;
  req.checkBody('email', 'Email is verplicht').notEmpty;
  req.checkBody('description', 'Info over jezelf is verplicht').notEmpty;


  var errors = req.validationErrors();

  if (errors) {
    // console.log('error');
    res.render('pages/register.ejs', {
      title: "register",
      users: users,
      errors: errors
    });
  } else {
    var newUser = {
      first_name: req.body.firstname,
      email: req.body.email,
      description: req.body.description
    }

    console.log('Registeren is gelukt');
    // db.users.insert(newUSer, (errors, req, res)
      // studenten_nummer: req.body.studenten_nummer,
      // password: req.body.password
    }

    console.log('Registeren is gelukt');
  }


);


function login(req, res) {
  res.render('pages/Login.ejs', {
    title: "inloggen"
  });
}

function home(req, res) {
  res.render('pages/index.ejs', {
    title: "Home"
  });
}

function edit(req, res) {
  res.render('pages/edit.ejs', {
    title: "edit"
  });
}

function profile(req, res) {
  res.render('pages/profile.ejs', {
    title: "profile"
  });
}

function userprofile(req, res) {
  db.users.find(function(err, docs){
    console.log(docs);
    res.render('pages/userprofile.ejs', {
      title: "userprofile",
      users: docs
    });
  }) 
  
}

app.use(function (req, res, next) {
  res.status(404).render('error');
});

app.listen(port, function () {
  console.log(`Server started on port 3000`);
})