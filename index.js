require('dotenv').config();
const Express = require('express');
const app = Express();
const db = require('./db');

app.use(Express.json());

app.use(require('./middleware/headers'));

app.use(Express.static(__dirname + '/public')); 

app.get('/', (req, res) => res.render('index')); 

const user = require('./controllers/usercontroller')
app.use('/user', user);

const pawpost = require('./controllers/postcontroller')
app.use('/pawpost', pawpost);

const comments = require('./controllers/commentcontroller')
app.use('/comments', comments);

db.authenticate()
.then(() => db.sync({alter: true}))
// alter:true checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model. force: true resets all tables
.then(() => {
app.listen(process.env.PORT,()=> {
    console.log(`App is listening on port ${process.env.PORT}`)})
})
.catch(err => {
    console.log('[server]: Server Crashed')
    console.log(err)
})
