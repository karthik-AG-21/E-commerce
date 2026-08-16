import axios from "axios";

 const updateUserStatus = async ({ userId, status }) => {

    const response = await axios.patch( `http://localhost:3000/users/${userId}`,{ isBlocked: status,});

    return response.data;
};

export default updateUserStatus;