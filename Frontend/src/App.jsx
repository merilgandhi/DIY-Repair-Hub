import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { GuideProvider } from './context/GuideContext.jsx';
import Navbar from './components/Common/Navbar.jsx';
import Home from './components/pages/Home.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import Profile from './components/pages/Profile.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <GuideProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
          </div>
        </GuideProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;