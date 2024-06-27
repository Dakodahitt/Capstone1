import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const URL = 'https://capstone-11.onrender.com';

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${URL}/items`);
        setItems(response.data);
        setFilteredItems(response.data);
        const categories = [...new Set(response.data.map(item => item.category))];
        setCategories(['All', ...categories]);
      } catch (error) {
        setError('Failed to fetch items');
        console.error('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filterItems = () => {
    let filtered = items;
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    setFilteredItems(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-container">
      <form className="search-form">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <button type="button" className="search-button" onClick={filterItems}>Search</button>
      </form>
      <div className="category-filter">
        <label htmlFor="category-select" className="category-label">Filter by category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="items-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="item-container">
            <div className="item-text">
              <a href={`/item/${item.id}`} className="item-title">{item.title}</a>
            </div>
            <div className="item-image">
              <img src={item.picture} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
