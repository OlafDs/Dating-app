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
app.use(express.static(path.join(__dirname, 'static')))

app.use(function (req, res, next) {
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
app.get("/login", login)
app.get("/profile", profile)
app.get("/matches", matches)


app.post('/', function (req, res) {
  res.send('Got a POST request')
})

function start(req, res) {
  res.render('pages/start.ejs', {
    title: "start"
  });
}

function register(req, res) {
  db.users.find(function (err, docs) {
  res.render('pages/register.ejs', {
    title: "register",
    users: docs
  });
})
}
app.post('/users/add', function (req, res) {

  req.checkBody('first_name', 'Voornaam is verplicht').notEmpty;
  req.checkBody('last_name', 'Achternaam is verplicht').notEmpty;
  req.checkBody('leeftijd', 'Leeftijd is verplicht').notEmpty;
  req.checkBody('sport', 'Sport is verplicht').notEmpty;
  req.checkBody('description', 'Info over jezelf is verplicht').notEmpty;


  console.log('Registeren is gelukt');
  res.redirect("../userprofile");
  db.users.insert(newUser, function (req, res) {
    if (err) {
      console.log(err);
    }
  });
})
app.delete('/users/delete', function (req, res) {


  console.log('Registeren is gelukt');
  res.redirect("../userprofile");
  db.users.remove(docs, function (reg, res) {
    if (err) {
      console.log(err);
    }
  });
})


function login(req, res) {
  res.render('pages/login.ejs', {
    title: "login"
  });
}

function home(req, res) {
  res.render('pages/index.ejs', {
    title: "Home"
  });
}
function matches(req, res) {
  res.render('pages/matches.ejs', {
    title: "matches"
  });
}

function profile(req, res) {
  res.render('pages/profile.ejs', {
    title: "profile"
  });
}

function userprofile(req, res) {
  db.users.find(function (err, docs) {
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