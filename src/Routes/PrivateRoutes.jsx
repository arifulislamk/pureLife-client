import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types'

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()

    if (user) return children
    if (loading) return <p>loading</p>

    return <Navigate to='/login' state={location.pathname} replace />
};
PrivateRoutes.propTypes = {
    children: PropTypes.element,
}
export default PrivateRoutes;