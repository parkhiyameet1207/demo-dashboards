const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Add a new card
router.post('/add', async (req, res) => {
  const { cardText, cardId, listId } = req.body;

  const newCard = new Card({
    cardText,
    cardId,
    listId,
  });

  try {
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
