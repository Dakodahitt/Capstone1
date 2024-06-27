import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SearchPage.css';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const filteredResults = response.data.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        console.error('Failed to fetch items', error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      <div className="results-grid">
        {results.map(item => (
          <div key={item.id} className="result-item">
            <div className="result-item-text">
              <a href={`/item/${item.id}`} className="result-item-title">{item.title}</a>
            </div>
            <div className="result-item-image">
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;