import { Navigate } from "react-router-dom";



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
        return <Navigate to="/login" replace />
    }

    return children
   
}

export default AdminRoute;