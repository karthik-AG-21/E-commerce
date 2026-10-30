import axios from "axios";


 const api = axios.create({ 
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
    });

    // baseURL: "http://172.16.1.129:8000",



api.interceptors.response.use((response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {

            originalRequest._retry = true;

            try {
                await api.post("/auth/refresh");

                return await api(originalRequest);

            } catch (error) {
                console.log("Refresh token expired");
                throw error;
            }
        }

        throw error;
    }
);

export default api;