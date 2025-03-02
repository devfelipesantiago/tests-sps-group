import { Navigator } from 'react-router-dom';
import authService from '../services/authService';

const protectRouter = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) return <Navigator to="/signin" replace />;
  return children;
};

export default protectRouter;
