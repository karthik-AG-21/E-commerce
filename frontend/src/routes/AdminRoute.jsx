
// import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function AdminRoute({ children }) {

//     let user;

//     try {
//         user = JSON.parse(localStorage.getItem("user"));
//     } catch {
//         user = null;
//     }

//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }

//     if (user.role !== "admin") {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// }

// export default AdminRoute;

import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    let user = null;

    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch {
        user = null;
    }

    if (!user || typeof user !== "object" || !user.id) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;

}

export default AdminRoute;
