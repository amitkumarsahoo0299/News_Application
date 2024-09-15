const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY; // Use NewsAPI Key here

// Endpoint to fetch news
app.get('/news', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    const url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=10&apiKey=${API_KEY}`; // Use NewsAPI's "everything" endpoint
    const response = await axios.get(url);
    
    // Send only relevant data to frontend
    const data = {
      totalResults: response.data.totalResults,
      articles: response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        content: article.content,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt
      }))
    };
    
    res.json(data); // Send data to frontend
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
