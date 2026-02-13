import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext'; // Adjust path if needed
import Login from './src/pages/Login'; // Adjust path
import AdminDashboard from './src/pages/AdminDashboard'; // Or AdminAdminDashboard, adjust path
import ProjectDetails from './src/pages/ProjectDetails'; // Adjust path
import Home from './src/pages/Home'; // The provided code, renamed to Home
import { Navigate } from 'react-router-dom';
import { useAuth } from './src/context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* This is the home/Home page */}
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;