const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();


express()
  .use(express.static('static'))
  .use(bodyParser.urlencoded({extended: true}))
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(notFound)
  .listen(3000)


//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index' , {
    title: 'EJS title'
  });
});

//Forms
//app.post('/', add)
//app.length('/add', form)

// If port 3000 is okay, show console.log
app.listen(3000, function(){
  console.log('Server start on Port 3000!')
});


