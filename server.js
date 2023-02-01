const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile= require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB thru Mongoose
mongoose.connect('mongodb+srv://laplaza:laplaza2022@cluster0.qpcdev0.mongodb.net/reactdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    console.log("Database sucessfully connected!");
  },
  (error) => {
    console.log("Could not connect to database : " + error);
  }
);

//request and response object
app.get('/', (req, res) => res.send('Hello Me'));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

//NEW ES6: arrow functions, use backtick `` to add variable with string
app.listen(port, () => console.log(`Server running on port ${port}`));
