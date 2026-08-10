import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export async function registerUser(user) {

    // Check existing email
    const existingUser = await axios.get(`${BASE_URL}?email=${user.email}`);

    if (existingUser.data.length > 0) {
        throw new Error("Email already exists");
    }

    // Register user
    const response = await axios.post(BASE_URL, user);

    return response.data;
}

export async function loginRequest({ email, password }) {
    
    const { data: users } = await axios.get(`${BASE_URL}?email=${email}`);

    const user = users[0];

    if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
    }

    delete user.password;
    return user;

}