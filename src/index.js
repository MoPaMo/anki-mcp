const app = require('./server');
const config = require('./config');

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Anki MCP server running on port ${PORT}`);
  console.log(`Connected to AnkiConnect at ${config.ankiConnectUrl}`);
});