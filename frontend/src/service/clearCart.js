import axios from "axios";

export const clearCartApi = async (userId) => {
    
    const response = await axios.patch(`http://localhost:3000/users/${userId}`,{cart: [],});

    return response.data;
};