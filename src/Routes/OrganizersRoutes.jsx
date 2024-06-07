import { Navigate } from "react-router-dom";
import useOrganizer from "../hooks/useOrganizer";

const OrganizersRoutes = ({ children }) => {
    const [role, isLoading] = useOrganizer()

    if (isLoading) return <p>loading</p>
    if (role === 'organizer') return children
    return <Navigate to='/dashboard' />
};

export default OrganizersRoutes;