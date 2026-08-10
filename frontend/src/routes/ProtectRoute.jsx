
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const userId  = localStorage.getItem("userId");

    const  user = JSON.parse(localStorage.getItem("user"));

     //  return user ? children : <Navigate to="/login" replace />;

     console.log("user",user)

    if(!userId){
        return <Navigate to="/login" replace />
    }

    if(!user){
        return <Navigate to="/login" replace />
    }


    return children

   

}

export default ProtectedRoute ;

