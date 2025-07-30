const ankiService = require('../services/anki');
const response = require('../utils/response');

const searchCards = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return response.error(res, 'Search query is required');
    }
    
    const cards = await ankiService.searchCards(query);
    return response.success(res, cards, 'Search results retrieved successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const openBrowser = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return response.error(res, 'Search query is required');
    }
    
    await ankiService.guiBrowse(query);
    return response.success(res, null, 'Browser opened successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

module.exports = {
  searchCards,
  openBrowser
};