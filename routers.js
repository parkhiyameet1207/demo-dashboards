// routes/userRoutes.js
const mongoose = require("mongoose");

const express = require('express');
const router = express.Router();

const Task = new mongoose.Schema({
    title: String
  });
// GET route for the home page
router.get('/', (req, res) => {
    res.render('index', { message: null, error: null });
});

// POST route for adding a user
router.post('/user', async (req, res) => {
    try {
        const newUser = new Task({
            title: req.body.name,
        });
        await newUser.save();
        res.render('index', { message: 'User data saved successfully!' });
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).render('index', { error: 'Error saving user data' });
    }
});

module.exports = router;
