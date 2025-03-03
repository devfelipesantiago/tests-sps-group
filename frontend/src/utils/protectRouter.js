import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const protectRouter = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};

export default protectRouter;
