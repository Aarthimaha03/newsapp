import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('sports'); // Default category is set to 'entertainment'
  const [country, setCountry] = useState('us');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news`, {
          params: {
            category,
            country,
          },
        });
        setNews(response.data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [category, country]);

  return (
    <div className="news-container">
      <h1 className="title">News Aggregator</h1>
      <div className="filters">
        <div className="filter-item">
          <label>Country:</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="select"
          >
            <option value="us">US</option>
            <option value="in">India</option>
            <option value="gb">UK</option>
         
          </select>
        </div>
        <div className="filter-item">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select"
          >
            <option value="sports">Sports</option> {/* Changed from 'general' to 'entertainment' */}
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="education">Education</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>
      <div className="news-list">
        <h2>Top Headlines</h2>
        <div className="news-cards">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="news-image"
                />
              )}
              <div className="news-content">
                <h3 className="news-title">{article.title}</h3>
                <p className="news-description">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
