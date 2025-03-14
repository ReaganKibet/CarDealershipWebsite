import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExploreCars from './pages/ExploreCars';
import AdminPanel from './pages/AdminPanel';
import About from './pages/About';
import Trends from './pages/Trends';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import CarForm from './pages/CarForm';
import CarDetails from './pages/CarDetails';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <div className="md:pr-16"> {/* Add padding to account for vertical navbar */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExploreCars />} />
                <Route path="/car/:id" element={<CarDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/trends" element={<Trends />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                <Route path="/admin/car/new" element={
                  <ProtectedRoute>
                    <CarForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/car/:id" element={
                  <ProtectedRoute>
                    <CarForm />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;