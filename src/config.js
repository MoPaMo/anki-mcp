require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  ankiConnectUrl: process.env.ANKI_CONNECT_URL || 'http://localhost:8765',
  ankiConnectVersion: 6
};