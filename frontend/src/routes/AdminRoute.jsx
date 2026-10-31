
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminRoute({ children }) {

    let user;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    if (!user) {
        toast.error("Please Login");
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        toast.error("Admin access only");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;