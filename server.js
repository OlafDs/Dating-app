/**Credits to StackOverflow - Back-end slides - Traversy Media and my classmates for helping me out */
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
const dotenv = require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const mongodb = require('mongodb').MongoClient;
const db = mongojs('datingapp', ['users']);
const port = 3000;

const app = express();


//view Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Connect to your chosen database
mongoose.connect('mongodb://localhost/datingapp', {
  useNewUrlParser: true
});

// Set Static path
app.use(express.static(path.join(__dirname, 'static')))
app.use(function (req, res, next) {
  res.locals.errors = null
  next();
});

// Body Parser Middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.listen(8000);

app.get("/", start)
app.get("/login", login)
app.get("/index", home)
app.get("/register", register)
app.get("/profile", profile)
app.get("/matches", matches)



app.post('/', function (req, res) {
  res.send('Got a POST request')
});

function start(req, res) {
  res.render("pages/start.ejs", {
    title: "start"
  })
};

function start(req, res) {
  res.render("pages/login.ejs", {
    title: "login"
  })
};

function register(req, res) {
  db.users.find(function (docs) {
    res.render("pages/register.ejs", {
      title: "register",
      users: docs
    });
  });
}

function home(req, res) {
  res.render("pages/index.ejs", {
    title: "home",
    user: req.session.user
  })
};

function matches(req, res) {
  res.render("pages/matches.ejs", {
    title: "matches",
    user: req.session.user
  })
};


app.post('/users/add', function (req, res) {
  //  object destructering var newUser = { first_name, last_name, age, description. sport, email, password } = reg.body;
  var newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    description: req.body.description,
    sport: req.body.sport,
    email: req.body.email,
    password: req.body.password
  };
  console.log('Registeren is gelukt');
  res.redirect("../profile");
  db.users.insert(newUser);
});

app.get('/users/delete', function (req, res) {
  db.users.remove({});
  console.log('Account is gewist');
  res.redirect("../register");
});

app.get('/users/login', function (req, res) {

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email,
    password: password
  }, function (req, res) {

    if (err) {
      console.log(err);
      return res.status(500).send();

    }
    if (!user) {

      return res.status(404).send();
    }

    return res.status(200).send();
  })

});

function login(req, res) {
  db.users.find(function (docs) {
    res.render('pages/login.ejs', {
      title: "login",
      user: req.session.user,
      users: docs
    })
  })
};


function profile(req, res) {
  db.users.find(function (err, docs) {
    console.log(docs);
    res.render('pages/profile.ejs', {
      title: "profile",
      users: docs,
      user: req.session.user
    });
  });
}


app.use(function (req, res, next) {
  res.status(404).render('error');
});

app.listen(port, function () {
  console.log(`Server started on port 3000 with no errors`);
});