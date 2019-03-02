const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./app/auth/auth.js');
const todo = require('./app/todo/todoRoute');

const app = express();

// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use('/api/', auth);
app.use('/api/', todo);


app.listen(4000);