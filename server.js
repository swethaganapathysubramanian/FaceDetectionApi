const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const app = express();
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facedetection'
  }
});


app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("it is working");
})

app.post('/signin',(req,res)=>{ signin.handleSignin(req, res, db, bcrypt)});

app.post('/register',(req,res)=>{ register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id',(req, res)=>{ profile.profileHandle(req, res, db) });

app.put('/image',(req,res)=>{ image.imageHandle(req, res, db) });

app.post('/image', (req, res) => { image.handleApiCall(req, res, ) });

app.listen(process.env.PORT || 3000, ()=>{
    console.log('app is running on port 3000');
})

/*
/ -->root
/signin --> POST success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> updated count
*/

/*bcrypt.hash("bacon", null, null, function (err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function (err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function (err, res) {
    // res = false
});

    bcrypt.compare("cookies", "$2a$10$r8CM81wEVDfK5r/Y2D9NvOS/tiWLZnFkCw6KtKrhMUAl6whB0ED6i", function (err, res) {
       console.log("cookies",res)
    });
    bcrypt.compare("veggies", "$2a$10$r8CM81wEVDfK5r/Y2D9NvOS/tiWLZnFkCw6KtKrhMUAl6whB0ED6i", function (err, res) {
        console.log("veggies",res)
    });
*/

//db.select('*').from('users').then(data=>{
  //  console.log(data);
//});