const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRoute = require('./routes/users');

const app = express();

dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/users', usersRoute);

// Connect to the database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to database'));

app.listen(3001, () => console.log('Listening on port 3001'));