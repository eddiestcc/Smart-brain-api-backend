const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { controlSignIn } = require('./controllers/controlSignIn');
const { controlRegister } = require('./controllers/controlRegister.js');
const { controlProfile } = require('./controllers/controlProfile');
const { controlImage , controlApiCall } = require('./controllers/controlImage');

const port = process.env.PORT || 8080;

// DATABASE
// KNEX
const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '52.41.36.82' || '54.191.253.12' || '44.226.122.3',
      port: 5432,
      user: '',
      password: '',
      database: 'smart-brain',
    },
  });

// SERVER
// APP
const app = express();

// MIDDLEWARE 
app.use(express.json())
app.use(cors());

// ROOT
app.get('/', (req,res) => {
    res.json('database.users');
})
// SIGN IN
app.post('/signin', (req,res) => controlSignIn(req,res,knex,bcrypt))
// REGISTER
app.post('/register', (req,res) => controlRegister(req,res,knex,bcrypt))
// Profile 
app.get('/profile/:id', (req,res) => controlProfile(req,res,knex));
// Image 
app.put('/image' , (req,res) => controlImage(req,res,knex));
// API Call
app.post('/imageurl' , (req,res) => controlApiCall(req,res));

// BUILD ENV
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);

// CONSOLE 
app.listen(3000, () => {
    console.log('App is running of port 3000');
});

