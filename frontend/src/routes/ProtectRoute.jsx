


// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {

//     let user;

//     try {
//         user = JSON.parse(localStorage.getItem("user"));
//     } catch {
//         user = null;
//     }

//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// }

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
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

return children;


}

export default ProtectedRoute;

