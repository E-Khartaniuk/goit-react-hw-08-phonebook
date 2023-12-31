import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(state => state.auth.access_token);
  return isAuth ? children : <Navigate to="/login" state={location} />;
};

export default PrivateRoute;
