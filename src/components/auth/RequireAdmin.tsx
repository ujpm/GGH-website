import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RequireAdminProps {
  children: JSX.Element;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
}
