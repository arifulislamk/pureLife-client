import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types'
import LoadingSpiner from "../components/Shared/LoadingSpiner";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()

    if (loading) return <LoadingSpiner />
    if (user) return children

    return <Navigate to='/login' state={location.pathname} replace />
};
PrivateRoutes.propTypes = {
    children: PropTypes.element,
}
export default PrivateRoutes;