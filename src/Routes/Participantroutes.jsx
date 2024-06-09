import { Navigate } from "react-router-dom";
import useOrganizer from "../hooks/useOrganizer";
import LoadingSpiner from "../components/Shared/LoadingSpiner";

const Participantroutes = ({ children }) => {
    const [role, isLoading] = useOrganizer()

    if (isLoading) return <LoadingSpiner />
    if (role === 'participant') return children
    return <Navigate to='/dashboard' />
};

export default Participantroutes;