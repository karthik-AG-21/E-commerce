import axios from "axios";
import api from "../api/api.js";


export async function registerUser(user) {
    const response = await api.post("/register", user);

    return response.data;
}

export async function loginRequest({ email, password }) {
    
    const  response = await api.post("/login",{email,password});

    return response.data;  

}