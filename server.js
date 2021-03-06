/**Credits to StackOverflow - Back-end slides - Traversy Media and my classmates for helping me out */
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const session = require('express-session');
const path = require('path');

const mongodb = require('mongodb');
const mongojs = require('mongojs');
const mongoose = require('mongoose');

const port = process.env.DB_PORT;
const db = mongojs(process.env.MONGO_DB, ['users']);
const host = process.env.HOST;
const dbURL = process.env.MONGODB_URI;
const bcrypt = require('bcryptjs');


const User = require('./utilities/userlogin');

const app = express();



//view Engine
app.set('view engine', 'ejs');
app.set('views', 'views');


//------------------------MIDDELWARE-----------------------------//

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
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbURL: process.env.DB_URL,
  secret: process.env.SESSION_SECRET,
  maxAge: 23 * 50 * 50,
  secure: false
}));



//https://medium.com/@nohkachi/local-authentication-with-express-4-x-and-passport-js-745eba47076d
//Check for mongoose connection (just to be extra sure there is really a connection with the database)
mongoose.createConnection(dbURL, {
  useNewUrlParser: true
});
const dbcon = mongoose.connection;
//If the connection to the database can't be made
dbcon.on('error', function (err) {
  console.error('There was a db connection error');
  return console.error(err.message);
});
//If there is a connection with the database
dbcon.once('connected', function () {
  return console.log('Connected to the database');
});

app.get('/', login),
  app.get('/login', login),
  app.get('/register', register);
app.get('/logout', logout);

//Gets the given port in the .env file
app.listen((port));


app.post('/', function (req, res) {
  res.send('Got a POST request')
});



//----ADD USER ON REGISTER PAGE FUNCTION----//

//https://www.youtube.com/watch?v=CrAU8xTHy4M&t=718s
app.post('/users/add', function (req, res) {

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      throw err;
    }

    //  object destructuring  const newUser = { first_name, last_name, age, description, sport, email, password } + reg.body;
    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      description: req.body.description,
      sport: req.body.sport,
      email: req.body.email,
      password: hash
    };

    console.log('Registeren is gelukt');
    res.redirect('../profile');
    db.users.insert(newUser);
  });
});
//----DELETE USER ACCOUNT FUNCTION----//

app.get('/users/delete', function (req, res) {
  //Gets the user id that is logged in
  const id = req.session.user._id
  db.users.remove({
    _id: id
  }, (err) => {
    //If user can't be deleted, show status 500 - Internal server error. Prevented from fulfilling the request
    if (err) {
      console.log(err)
      res.status(500).send()
    }
    // And if the user is deleted, redirect to the register page 
    else {
      console.log('User removed')
      return res.status(200).send(), res.redirect('/register');
    }
  })
})

//----CHECK FOR USER LOGIN FUNCTION----//

//Credits https://www.youtube.com/watch?v=pzGQMwGmCnc&t=489s


app.post('/users/login', function (req, res, next) {

  email = req.body.email;
  password = req.body.password;

  let query = {
    email: email,
    password: password
  };

  db.users.findOne(query, function (err, user) {
    if (err) {
      console.log(err);
      console.log('Error');
      return res.redirect('/login');
    }
    if (!user) {
      console.log('Inloggen mislukt');
      return res.redirect('/login');
    }
    req.session.user = user;
    console.log('Inloggen gelukt');
    return res.status(200).send, res.redirect('/index');
  });
});

//--------------------PAGES--------------------------//

//----LOG THE USER OUT WHEN THE USER CLICKS ON 'logout' AND REDIRECT THE USER TO THE LOGIN PAGE----//

function logout(req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/login');
      console.log('Je bent nu uitgelogd');
    }
  });
}

//----START WITH LOGIN PAGE----//

function start(req, res) {
  res.render("pages/login.ejs", {
    title: "login",
    users: docs,
    user: req.session.user
  })
};

//----LOGIN PAGE----//

function login(req, res) {
  db.users.findOne(function (docs) {
    res.render('pages/login.ejs', {
      title: "login",
      users: docs,
      user: req.session.user
    });
  });
}

//----REGISTER PAGE----//

function register(req, res) {
  db.users.findOne(function (docs) {
    res.render('pages/register.ejs', {
      title: "register",
      users: docs,
      user: req.session.user
    });
  });
}

//----INDEX/SWIPE PAGE - MATCH WITH PEOPLE----//
app.get('/index', function (req, res) {
  //Checks If user is logged in or not. If user is not logged in, redirect the user to the login page
  if (!req.session.user) {
    return res.redirect('login'), res.status(401).send();
  }
  res.render('pages/index.ejs', {
    title: 'home',
    user: req.session.user
  })
});

//----MATCHES PAGE - SEE YOUR MATCHES----//

app.get('/matches', function (req, res) {
  //Checks If user is logged in or not. If user is not logged in, redirect the user to the login page
  if (!req.session.user) {
    return res.redirect('login'), res.status(401).send();
  }
  res.render('pages/matches.ejs', {
    title: 'matches',
    user: req.session.user
  });
});

//----PROFILE PAGE----//

app.get('/profile', function (req, res) {
  if (!req.session.user) {
    return res.redirect('login'), res.status(401).send();
  } else {
    res.render('pages/profile.ejs', {
      title: "profile",
      user: req.session.user
    })
  }
  console.log(process.env.SESSION_SECRET);
  //return res.send(process.env.SESSION_SECRET); --- Gets Error [ERR_HTTP_HEADERS_SENT]:
});


//--------------------CHECK STATUS--------------------------//

app.use(function (req, res, next) {
  res.status(404).render('error');
});

app.listen(port, function () {
  console.log(`Successfully connected to the port`);
});