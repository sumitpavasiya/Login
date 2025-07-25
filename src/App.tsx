import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Header';
import Blog from './Blog';
import Admin from './Admin';
import Blogpage from './Blogpage'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog/:category/:id" element={<Blogpage />} />
      </Routes>
    </Router>
  );
}

export default App;
