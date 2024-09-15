import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css'; // Import CSS file

const News = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // New state to control search

  // Fetch news articles from the backend
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/news', {
        params: {
          query: search,
          page: page,
        },
      });
      setArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalArticles / 10)); // Assuming 10 articles per page
    } catch (error) {
      setError('Failed to load news');
    }
    setLoading(false);
  };

  // Fetch news when search or page changes and only if hasSearched is true
  useEffect(() => {
    if (hasSearched && search) {
      fetchNews();
    }
  }, [search, page, hasSearched]); // Depend on search, page, and hasSearched

  const handleSearch = () => {
    setPage(1); // Reset to page 1 on new search
    setHasSearched(true); // Set flag to true to start fetching
    fetchNews(); // Trigger search
  };

  return (
    <div className="news-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for news"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search term on input change
        />
        <button onClick={handleSearch}>Search</button>  {/* Trigger search on button click */}
      </div>

      {hasSearched && (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="articles">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <div key={article.url} className="article">
                    <img src={article.image} alt={article.title} />
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                  </div>
                ))
              ) : (
                <p>No articles found.</p>
              )}
            </div>
          )}
        </>
      )}

      {hasSearched && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Move to previous page
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)} // Move to next page
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
