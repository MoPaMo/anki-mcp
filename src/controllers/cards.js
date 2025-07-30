const ankiService = require('../services/anki');
const response = require('../utils/response');

const getCardInfo = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return response.error(res, 'Card ID is required');
    }
    
    const cardInfo = await ankiService.getCardsInfo([parseInt(id)]);
    
    if (!cardInfo || cardInfo.length === 0) {
      return response.notFound(res, 'Card not found');
    }
    
    return response.success(res, cardInfo[0], 'Card retrieved successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const addCard = async (req, res) => {
  try {
    const { deckName, modelName, fields, tags } = req.body;
    
    if (!deckName || !modelName || !fields) {
      return response.error(res, 'Deck name, model name, and fields are required');
    }
    
    const noteId = await ankiService.addCard(deckName, modelName, fields, tags || []);
    return response.success(res, { id: noteId }, 'Card added successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { fields } = req.body;
    
    if (!id || !fields) {
      return response.error(res, 'Card ID and fields are required');
    }
    
    await ankiService.updateCard(parseInt(id), fields);
    return response.success(res, null, 'Card updated successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return response.error(res, 'Card ID is required');
    }
    
    await ankiService.deleteCards([parseInt(id)]);
    return response.success(res, null, 'Card deleted successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const getModels = async (req, res) => {
  try {
    const models = await ankiService.getModels();
    return response.success(res, models, 'Models retrieved successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

const getModelFields = async (req, res) => {
  try {
    const { name } = req.params;
    
    if (!name) {
      return response.error(res, 'Model name is required');
    }
    
    const fields = await ankiService.getModelFields(name);
    return response.success(res, fields, 'Model fields retrieved successfully');
  } catch (err) {
    return response.error(res, err.message);
  }
};

module.exports = {
  getCardInfo,
  addCard,
  updateCard,
  deleteCard,
  getModels,
  getModelFields
};