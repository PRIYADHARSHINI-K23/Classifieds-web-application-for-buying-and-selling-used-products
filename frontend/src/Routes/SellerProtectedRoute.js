import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import BackdropLoader from '../components/Layouts/BackdropLoader';

const SellerProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated, seller } = useSelector((state) => state.seller);
    const { isAuthenticated: isUserAuth } = useSelector((state) => state.user);

    if (loading === true) {
        return <BackdropLoader />;
    }

    if (isAuthenticated === false) {
        if (isUserAuth) {
            return <Navigate to="/account" />;
        }
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default SellerProtectedRoute;
