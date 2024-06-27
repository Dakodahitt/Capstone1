import { Navigate } from 'react-router-dom';
import { getToken } from '../services/auth';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;