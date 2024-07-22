const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

// DATABASE

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0,
            joice: new Date(),
        }
    ],
    // login: [
    //     {
    //         id: '987',
    //         hash: '',
    //         email: 'john@gmail.com'
    //     }
    // ]
}

// SERVER

// APP
const app = express();

// MIDDLEWARE 

app.use(express.json())
app.use(cors());


// ROOT
app.get('/', (req,res) => {
    res.json(database.users);
})

// SIGN IN
app.post('/signin', (req,res) => {
    //     // Load hash from your password DB.
    // bcrypt.compare("cookies", hash, function(err, res) {
    //     // res == true
    //     console.log(res)
     
    // });
    // bcrypt.compare("veggies", hash, function(err, res) {
    //     // res = false
    //     console.log(res)
    // });
    if (req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('login failed')
    }
    
})

// REGISTER
app.post('/register', (req,res) => {
    const {email,name,password} = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     // Store hash in your password DB.
    // });    
    database.users.push(
    {
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
})

// Profile 
app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
});

// Image 
app.put('/image' , (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
});

// CONSOLE 
app.listen(3000, () => {
    console.log('App is running of port 3000');
});
