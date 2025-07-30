const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const decksController = require('./controllers/decks');
const cardsController = require('./controllers/cards');
const searchController = require('./controllers/search');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/decks', decksController.getDecks);
app.post('/api/decks', decksController.createDeck);
app.get('/api/decks/:name/stats', decksController.getDeckStats);

app.get('/api/cards/:id', cardsController.getCardInfo);
app.post('/api/cards', cardsController.addCard);
app.put('/api/cards/:id', cardsController.updateCard);
app.delete('/api/cards/:id', cardsController.deleteCard);

app.get('/api/models', cardsController.getModels);
app.get('/api/models/:name/fields', cardsController.getModelFields);

app.get('/api/search', searchController.searchCards);
app.get('/api/browse', searchController.openBrowser);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

module.exports = app;