const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/trello_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if connection was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const cardRoutes = require('./routes/cards');
app.use('/api/cards', cardRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
