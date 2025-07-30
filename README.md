# Anki-MCP: Anki Model-Controller-Provider for Claude Integration

This server connects your Anki flashcard application to Claude AI through the AnkiConnect plugin.

## Prerequisites

- [Anki](https://apps.ankiweb.net/) installed
- [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin installed and configured
- Node.js (v14+) installed

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/MoPaMo/anki-mcp.git
   cd anki-mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Start the server:
   ```
   npm start
   ```

## Usage

The server provides the following API endpoints:

### Decks

- `GET /api/decks` - Get all decks
- `POST /api/decks` - Create a new deck
  - Body: `{ "name": "Deck Name" }`
- `GET /api/decks/:name/stats` - Get statistics for a specific deck

### Cards

- `GET /api/cards/:id` - Get information about a specific card
- `POST /api/cards` - Add a new card
  - Body: 
    ```json
    {
      "deckName": "Deck Name", 
      "modelName": "Basic", 
      "fields": {
        "Front": "Question", 
        "Back": "Answer"
      }, 
      "tags": ["tag1", "tag2"]
    }
    ```
- `PUT /api/cards/:id` - Update a card
  - Body: 
    ```json
    {
      "fields": {
        "Front": "New Question", 
        "Back": "New Answer"
      }
    }
    ```
- `DELETE /api/cards/:id` - Delete a card

### Models

- `GET /api/models` - Get all note models
- `GET /api/models/:name/fields` - Get fields for a specific model

### Search

- `GET /api/search?query=search+term` - Search for cards matching a query
- `GET /api/browse?query=search+term` - Open Anki's browser with search results

## Example Queries

The search API supports all standard Anki search operators:

- `deck:current` - Cards in the current deck
- `deck:"my deck"` - Cards in a specific deck
- `tag:important` - Cards with a specific tag
- `is:due` - Cards that are due for review
- `added:1` - Cards added today
- `rated:1` - Cards rated today
- `"some text"` - Cards containing specific text

## Integration with Claude

To integrate with Claude AI, use the API endpoints above to fetch, create, and modify Anki cards. 

Example conversation with Claude:

1. **User**: "Show me all my French vocabulary cards."
2. **Claude**: *[Makes request to `/api/search?query=deck:French`]* "Here are your French vocabulary cards: [displays results]"
3. **User**: "Add a new card for the word 'bonjour'."
4. **Claude**: *[Makes request to `/api/cards` with appropriate payload]* "I've added a new card for 'bonjour' to your French deck."

## Troubleshooting

- Make sure Anki is running before starting the server
- Verify AnkiConnect is installed and working by visiting `http://localhost:8765` in your browser
- Check the server logs for any errors

## License

MIT