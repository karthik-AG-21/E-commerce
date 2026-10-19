import api from "../api/api.js"

const getUserProfile = async()=>{

    const user = await api.get("/user/profile");

    return user.data
}

export default getUserProfile;