const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/users_db');

// Schema
const User = mongoose.model('User', { name: String, email: String });

// Routes
app.get('/users', async (req, res) => res.json(await User.find()));
app.post('/users', async (req, res) => res.json(await new User(req.body).save()));
app.delete('/users/:id', async (req, res) => res.json(await User.findByIdAndDelete(req.params.id)));

// Start
app.listen(5000, () => console.log('Server running @ 5000'));
// crud app