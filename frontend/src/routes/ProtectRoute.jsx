


import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    let user;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;

