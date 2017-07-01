const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const nodemailer = require('nodemailer');

var app = express();

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "no.reply.jsr@gmail.com",
        pass: "AwesomeAnime+103"
    }
});

app.use(express.static(__dirname + '/startbootstrap-freelancer'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/partials/aboutView');
hbs.registerPartials(__dirname + '/views/partials/constantsPViews');

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
app.use(express.static(__dirname + '/node_modules/bootstrap'));

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

app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.email,
        subject : req.query.subject,
        text : req.query.content
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + res.message);
        res.end("sent");
         }
       });
     });
app.listen(3000, () =>{
  console.log('Server us up on port 3000');
});
