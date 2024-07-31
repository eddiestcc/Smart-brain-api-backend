const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { controlSignIn } = require('./controllers/controlSignIn');
const { controlRegister } = require('./controllers/controlRegister.js');
const { controlProfile } = require('./controllers/controlProfile');
const { controlImage , controlApiCall } = require('./controllers/controlImage');


// DATABASE
// KNEX
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABSE_URL,
      port: 5432,
      username: 'mydb_b0sz_user',
      password: 'gpSLxC5UmrIcojhmpzsuCLH5dsjja77N',
      database: 'mydb_b0sz',
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
    res.json(knex.database);
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

// CONSOLE 
app.listen(3000, () => {
    console.log('App is running of port 3000');
});

