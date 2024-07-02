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
const cardRoutes = require('../routers.js');
app.use('/api/cards', cardRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dynamicDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Function to create a new model
const createModel = (modelName, schemaDefinition) => {
  const schema = new mongoose.Schema(schemaDefinition);
  return mongoose.model(modelName, schema);
};

// Routes
app.post('/create-model', async (req, res) => {
  const { modelName, fields } = req.body;

  try {
    const schemaDefinition = fields.reduce((acc, field) => {
      acc[field.name] = { type: mongoose.Schema.Types[field.type], required: field.required };
      return acc;
    }, {});

    const Model = createModel(modelName, schemaDefinition);
    res.status(201).send(`Model ${modelName} created successfully.`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/save-data', async (req, res) => {
  const { modelName, data } = req.body;

  try {
    const Model = mongoose.model(modelName);
    const newData = new Model(data);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
