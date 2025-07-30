const ankiService = require('../services/anki');
const response = require('../utils/response');

const getDecks = async (req, res) => {
  try {
    const decks = await ankiService.getDecks();
    return response.success(res, decks, 'Decks retrieved successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const createDeck = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return response.error(res, 'Deck name is required');
    }
    
    const deckId = await ankiService.createDeck(name);
    return response.success(res, { id: deckId, name }, 'Deck created successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const getDeckStats = async (req, res) => {
  try {
    const { name } = req.params;
    
    if (!name) {
      return response.error(res, 'Deck name is required');
    }
    
    const stats = await ankiService.getDeckStats(name);
    return response.success(res, stats, 'Deck stats retrieved successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

module.exports = {
  getDecks,
  createDeck,
  getDeckStats
};