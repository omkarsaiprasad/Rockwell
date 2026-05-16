# 😂 Joke Generator API Documentation

Complete Random Joke Generator using the Official Joke API - No authentication required!

## Features

- ✅ Random joke generation
- ✅ Category-specific jokes (programming, general, knock-knock)
- ✅ Bulk fetch (get 10 jokes at once)
- ✅ No API key required
- ✅ Real-time external API integration
- ✅ Error handling & fallbacks
- ✅ Response caching support

## API Endpoints

### 1. Get a Random Joke
**Endpoint:** `GET /api/jokes/random`

**Description:** Returns a single random joke from any category

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/random
```

**Example Response:**
```json
{
  "success": true,
  "joke": {
    "id": 1,
    "type": "general",
    "setup": "Why don't scientists trust atoms?",
    "punchline": "Because they make up everything!"
  },
  "source": "Official Joke API"
}
```

---

### 2. Get a Programming Joke
**Endpoint:** `GET /api/jokes/programming`

**Description:** Returns a random programming-related joke

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/programming
```

**Example Response:**
```json
{
  "success": true,
  "joke": {
    "id": 127,
    "type": "programming",
    "setup": "How many programmers does it take to change a light bulb?",
    "punchline": "None that's a hardware problem"
  },
  "category": "programming",
  "source": "Official Joke API"
}
```

---

### 3. Get a Knock-Knock Joke
**Endpoint:** `GET /api/jokes/knock-knock`

**Description:** Returns a random knock-knock joke

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/knock-knock
```

**Example Response:**
```json
{
  "success": true,
  "joke": {
    "id": 371,
    "type": "knock-knock",
    "setup": "Knock knock",
    "punchline": "Who's there?"
  },
  "category": "knock-knock",
  "source": "Official Joke API"
}
```

---

### 4. Get a General Joke
**Endpoint:** `GET /api/jokes/general`

**Description:** Returns a random general joke

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/general
```

**Example Response:**
```json
{
  "success": true,
  "joke": {
    "id": 45,
    "type": "general",
    "setup": "Why did the scarecrow win an award?",
    "punchline": "He was outstanding in his field"
  },
  "category": "general",
  "source": "Official Joke API"
}
```

---

### 5. Get Joke by Category
**Endpoint:** `GET /api/jokes/category/:category`

**Description:** Get a random joke from a specific category

**Available Categories:**
- `programming`
- `general`
- `knock-knock`

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/category/programming
```

**Example Response:**
```json
{
  "success": true,
  "joke": {
    "id": 150,
    "type": "programming",
    "setup": "Why do Java developers wear glasses?",
    "punchline": "Because they don't C#"
  },
  "category": "programming",
  "source": "Official Joke API"
}
```

---

### 6. Get 10 Random Jokes
**Endpoint:** `GET /api/jokes/ten`

**Description:** Returns 10 random jokes at once

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/ten
```

**Example Response:**
```json
{
  "success": true,
  "count": 10,
  "jokes": [
    {
      "id": 1,
      "type": "general",
      "setup": "Why don't scientists trust atoms?",
      "punchline": "Because they make up everything!"
    },
    {
      "id": 2,
      "type": "programming",
      "setup": "How many programmers does it take to change a light bulb?",
      "punchline": "None that's a hardware problem"
    },
    // ... 8 more jokes
  ],
  "source": "Official Joke API"
}
```

---

### 7. API Documentation
**Endpoint:** `GET /api/jokes/docs`

**Description:** Returns this documentation

**Example Request:**
```bash
curl http://localhost:3000/api/jokes/docs
```

---

## Usage Examples

### JavaScript (Fetch)

```javascript
// Get a random joke
async function getRandomJoke() {
  try {
    const response = await fetch('http://localhost:3000/api/jokes/random');
    const data = await response.json();
    console.log(`${data.joke.setup} ${data.joke.punchline}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get 10 jokes
async function getTenJokes() {
  try {
    const response = await fetch('http://localhost:3000/api/jokes/ten');
    const data = await response.json();
    data.jokes.forEach((joke, index) => {
      console.log(`${index + 1}. ${joke.setup} - ${joke.punchline}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

getRandomJoke();
```

### Python

```python
import requests

# Get a random joke
response = requests.get('http://localhost:3000/api/jokes/random')
data = response.json()
print(f"{data['joke']['setup']} - {data['joke']['punchline']}")

# Get programming jokes
response = requests.get('http://localhost:3000/api/jokes/programming')
data = response.json()
print(data['joke']['setup'])
```

### cURL

```bash
# Random joke
curl http://localhost:3000/api/jokes/random | jq '.joke'

# Programming joke
curl http://localhost:3000/api/jokes/programming | jq '.joke'

# 10 jokes
curl http://localhost:3000/api/jokes/ten | jq '.jokes'

# By category
curl http://localhost:3000/api/jokes/category/knock-knock | jq '.joke'
```

---

## Frontend Integration

### HTML/JavaScript Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Joke Generator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      text-align: center;
    }
    .joke {
      background: #f0f0f0;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .punchline {
      color: #0066cc;
      font-weight: bold;
      margin-top: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 5px;
    }
    button:hover {
      background: #0052a3;
    }
  </style>
</head>
<body>
  <h1>😂 Random Joke Generator</h1>
  
  <div>
    <button onclick="getJoke('random')">Random Joke</button>
    <button onclick="getJoke('programming')">Programming Joke</button>
    <button onclick="getJoke('general')">General Joke</button>
    <button onclick="getJoke('knock-knock')">Knock-Knock Joke</button>
  </div>

  <div id="joke" class="joke"></div>

  <script>
    async function getJoke(type) {
      try {
        const response = await fetch(`/api/jokes/${type}`);
        const data = await response.json();
        const jokeDiv = document.getElementById('joke');
        jokeDiv.innerHTML = `
          <p>${data.joke.setup}</p>
          <div class="punchline">${data.joke.punchline}</div>
        `;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  </script>
</body>
</html>
```

---

## Error Handling

### Invalid Category Error

**Request:**
```bash
curl http://localhost:3000/api/jokes/category/invalid
```

**Response:**
```json
{
  "success": false,
  "error": "Category 'invalid' not found. Try: programming, knock-knock, or general"
}
```

### API Unavailable Error

**Response:**
```json
{
  "success": false,
  "error": "Failed to fetch jokes from external API"
}
```

---

## Testing with Postman

### Setup

1. Open Postman
2. Create a new collection: "Rockwell Joke API"
3. Add these requests:

### Request 1: Random Joke
```
GET http://localhost:3000/api/jokes/random
```

### Request 2: Programming Joke
```
GET http://localhost:3000/api/jokes/programming
```

### Request 3: 10 Jokes
```
GET http://localhost:3000/api/jokes/ten
```

### Request 4: Category Joke
```
GET http://localhost:3000/api/jokes/category/general
```

---

## Performance Tips

1. **Caching:** Implement Redis for frequently requested jokes
2. **Rate Limiting:** Add rate limiting to prevent abuse
3. **Pagination:** For bulk jokes, implement pagination
4. **Compression:** Enable gzip compression for responses

---

## Future Enhancements

- [ ] Joke search/filtering
- [ ] Joke rating/voting system
- [ ] Custom joke submission
- [ ] Joke sharing to social media
- [ ] Daily joke schedule
- [ ] Joke statistics/analytics
- [ ] Multi-language support
- [ ] Joke categorization by difficulty

---

## Troubleshooting

### Issue: "Cannot GET /api/jokes/random"
**Solution:** Ensure the server is running (`npm run dev`)

### Issue: "Failed to fetch external API"
**Solution:** Check internet connection or Official Joke API status

### Issue: Slow responses
**Solution:** Implement caching or check external API performance

---

## Related Documentation

- [Main README](README.md)
- [Shopify Integration](SETUP.md)
- [Server Setup](server.js)

---

## Support

For issues or questions:
1. Check this documentation
2. Review error messages
3. Check GitHub issues
4. Contact support

---

**Made with ❤️ by omkarsaiprasad**
