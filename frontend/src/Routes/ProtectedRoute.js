import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);
    const { isAuthenticated: isSellerAuth } = useSelector(state => state.seller);

    if (loading === true) return null;

    if (isAuthenticated === false) {
        if (isSellerAuth) {
            return <Navigate to="/seller/dashboard" />;
        }
        return <Navigate to="/login" />;
    }

    if (isAdmin && user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
