import axios from "axios";



export async function addAddress(userId, address) {
    const response = await axios.patch(`http://localhost:3000/users/${userId}`, {address});

    return response.data;
}

export default addAddress;