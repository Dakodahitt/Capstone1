import React, { useState } from 'react';
import { searchProducts } from '../api/api';

const SearchBar = ({ setProducts }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const filteredProducts = await searchProducts(query);
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Failed to search products', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;