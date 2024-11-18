import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Blog from './components/Blog';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import ReadBlog from './components/ReadBlog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<Login />} />
        <Route path='/readBlog' element={<ReadBlog />} />
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        
        <Route path='/blog' element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
