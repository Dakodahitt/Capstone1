import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';
import SearchBar from './SearchBar';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  return (
    <div className="home-container">
      <SearchBar setProducts={setProducts} />
      {Array.isArray(products) && products.length ? (
        products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <Link to={`/product/${product.id}`} className="product-title">
                {product.title}
              </Link>
              <p className="product-description">
                {product.description}
              </p>
              <p className="product-price">Price: ${product.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Home;