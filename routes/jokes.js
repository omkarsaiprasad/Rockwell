const express = require('express');
const axios = require('axios');
const router = express.Router();

// Joke API endpoints
const JOKES_API = 'https://official-joke-api.appspot.com';
const RANDOM_JOKE_API = 'https://api.jokes.one/joke';

// GET /api/jokes/random - Get a random joke
router.get('/random', async (req, res, next) => {
  try {
    const response = await axios.get(`${JOKES_API}/random_joke`);

    res.json({
      success: true,
      joke: {
        id: response.data.id,
        type: response.data.type,
        setup: response.data.setup,
        punchline: response.data.punchline,
      },
      source: 'Official Joke API',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/jokes/programming - Get a random programming joke
router.get('/programming', async (req, res, next) => {
  try {
    const response = await axios.get(`${JOKES_API}/jokes/programming/random`);

    res.json({
      success: true,
      joke: {
        id: response.data[0].id,
        type: response.data[0].type,
        setup: response.data[0].setup,
        punchline: response.data[0].punchline,
      },
      category: 'programming',
      source: 'Official Joke API',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/jokes/knock-knock - Get a random knock-knock joke
router.get('/knock-knock', async (req, res, next) => {
  try {
    const response = await axios.get(`${JOKES_API}/jokes/knock-knock/random`);

    res.json({
      success: true,
      joke: {
        id: response.data[0].id,
        type: response.data[0].type,
        setup: response.data[0].setup,
        punchline: response.data[0].punchline,
      },
      category: 'knock-knock',
      source: 'Official Joke API',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/jokes/general - Get a random general joke
router.get('/general', async (req, res, next) => {
  try {
    const response = await axios.get(`${JOKES_API}/jokes/general/random`);

    res.json({
      success: true,
      joke: {
        id: response.data[0].id,
        type: response.data[0].type,
        setup: response.data[0].setup,
        punchline: response.data[0].punchline,
      },
      category: 'general',
      source: 'Official Joke API',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/jokes/category/:category - Get random joke by category
router.get('/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const response = await axios.get(`${JOKES_API}/jokes/${category}/random`);

    res.json({
      success: true,
      joke: {
        id: response.data[0].id,
        type: response.data[0].type,
        setup: response.data[0].setup,
        punchline: response.data[0].punchline,
      },
      category: category,
      source: 'Official Joke API',
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        error: `Category '${req.params.category}' not found. Try: programming, knock-knock, or general`,
      });
    }
    next(error);
  }
});

// GET /api/jokes/ten - Get 10 random jokes
router.get('/ten', async (req, res, next) => {
  try {
    const response = await axios.get(`${JOKES_API}/jokes/ten`);

    res.json({
      success: true,
      count: response.data.length,
      jokes: response.data.map(joke => ({
        id: joke.id,
        type: joke.type,
        setup: joke.setup,
        punchline: joke.punchline,
      })),
      source: 'Official Joke API',
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/jokes/docs - Documentation
router.get('/docs', (req, res) => {
  res.json({
    name: 'Joke Generator API',
    version: '1.0.0',
    description: 'Get random jokes from external APIs',
    endpoints: {
      random: {
        method: 'GET',
        path: '/api/jokes/random',
        description: 'Get a single random joke',
        example: 'curl http://localhost:3000/api/jokes/random',
      },
      programming: {
        method: 'GET',
        path: '/api/jokes/programming',
        description: 'Get a random programming joke',
        example: 'curl http://localhost:3000/api/jokes/programming',
      },
      knockKnock: {
        method: 'GET',
        path: '/api/jokes/knock-knock',
        description: 'Get a random knock-knock joke',
        example: 'curl http://localhost:3000/api/jokes/knock-knock',
      },
      general: {
        method: 'GET',
        path: '/api/jokes/general',
        description: 'Get a random general joke',
        example: 'curl http://localhost:3000/api/jokes/general',
      },
      byCategory: {
        method: 'GET',
        path: '/api/jokes/category/:category',
        description: 'Get a random joke by category',
        example: 'curl http://localhost:3000/api/jokes/category/programming',
      },
      ten: {
        method: 'GET',
        path: '/api/jokes/ten',
        description: 'Get 10 random jokes at once',
        example: 'curl http://localhost:3000/api/jokes/ten',
      },
      docs: {
        method: 'GET',
        path: '/api/jokes/docs',
        description: 'Get API documentation',
      },
    },
  });
});

module.exports = router;
