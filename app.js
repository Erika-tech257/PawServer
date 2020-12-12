require('dotenv').config();
const express = require ('express');
const app = express();
const database = require ('./db');


database.sync();

app.use(express.json());

const user = require('./controllers/usercontroller')
app.use('/user', user);

const pawpost = require('./controllers/postcontroller')
app.use('/pawpost', pawpost)


app.listen(5000, function(){
    console.log('App listening');
})

