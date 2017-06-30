const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');//middleware

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err) {
      console.log('Unable to append to server.js.');
    }
  });
  next();
});

// app.use((req,res,next) =>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

app.get('/', (req,res) =>{
    res.render('Home.hbs',{
      pageTitle: 'Welcome Page',
      welcomeMessage: 'Welcome to the Neon-Cathradals'
    });
});


app.get('/about', (req,res) =>{
      res.render('About.hbs',{
      pageTitle: 'Info Page',
    });
});

app.get('/bad', (req,res) =>{

  res.send({
    errorMessage: 'Error: Unable to handle request.'
  });
});

app.listen(3000, () =>{
  console.log('Server us up on port 3000');
});
