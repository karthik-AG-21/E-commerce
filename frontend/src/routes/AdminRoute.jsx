import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";



function AdminRoute({children}){

    

    const userId = localStorage.getItem("userId")

    const user = JSON.parse(localStorage.getItem("user"))

    console.log("user-details",user)

    if(!userId){
        return <Navigate to="/login" replace />
    }

    if(!user){
        return <Navigate to="/login" replace />
    }

    if(user.role !== "admin"){
        toast.error("Admin access only");
        return <Navigate to="/" replace />
        
        
    }

    

    return children
   
}

export default AdminRoute;