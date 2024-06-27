import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminItemList from './pages/AdminItemList';
import AdminItemForm from './pages/AdminItemForm';
import AdminUserList from './pages/AdminUserList';
import AdminReviewList from './pages/AdminReviewList';
import AdminCommentList from './pages/AdminCommentList';
import ItemDetailPage from './pages/ItemDetailPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/items" element={<AdminItemList />} />
        <Route path="/admin/items/new" element={<AdminItemForm />} />
        <Route path="/admin/users" element={<AdminUserList />} />
        <Route path="/item/:id" element={<ItemDetailPage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/reviews" element={<AdminReviewList />} />
        <Route path="/admin/comments" element={<AdminCommentList />} />
      </Routes>
    </>
  );
}

export default App;