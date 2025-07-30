const axios = require('axios');
const config = require('../config');

class AnkiService {
  constructor() {
    this.baseUrl = config.ankiConnectUrl;
    this.version = config.ankiConnectVersion;
  }

  async makeRequest(action, params = {}) {
    try {
      const response = await axios.post(this.baseUrl, {
        action,
        version: this.version,
        params
      });
      
      if (response.data.error) {
        throw new Error(`AnkiConnect error: ${response.data.error}`);
      }
      
      return response.data.result;
    } catch (error) {
      console.error(`Error in AnkiConnect request (${action}):`, error.message);
      throw error;
    }
  }

  // Deck operations
  async getDecks() {
    return this.makeRequest('deckNames');
  }

  async createDeck(name) {
    return this.makeRequest('createDeck', { deck: name });
  }

  async getDeckStats(deckName) {
    return this.makeRequest('getDeckStats', { deck: deckName });
  }

  // Card operations
  async getCards(query) {
    return this.makeRequest('findCards', { query });
  }

  async getCardsInfo(cardIds) {
    return this.makeRequest('cardsInfo', { cards: cardIds });
  }

  async addCard(deckName, modelName, fields, tags = []) {
    const note = {
      deckName,
      modelName,
      fields,
      tags
    };
    
    return this.makeRequest('addNote', { note });
  }

  async updateCard(id, fields) {
    return this.makeRequest('updateNoteFields', {
      note: {
        id,
        fields
      }
    });
  }

  async deleteCards(cardIds) {
    return this.makeRequest('deleteNotes', { notes: cardIds });
  }

  // Search operations
  async searchCards(query) {
    const cardIds = await this.getCards(query);
    if (cardIds.length === 0) {
      return [];
    }
    return this.getCardsInfo(cardIds);
  }

  // Model operations
  async getModels() {
    return this.makeRequest('modelNames');
  }

  async getModelFields(modelName) {
    return this.makeRequest('modelFieldNames', { modelName });
  }

  // Browse operations
  async guiBrowse(query) {
    return this.makeRequest('guiBrowse', { query });
  }
}

module.exports = new AnkiService();