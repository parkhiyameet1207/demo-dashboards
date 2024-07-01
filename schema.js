const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  cardText: { type: String, required: true },
  cardId: { type: String, required: true },
  listId: { type: String, required: true },
});

module.exports = mongoose.model('Card', CardSchema);
