import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});

let refreshPromise = null;

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const isRefreshRequest = originalRequest.url?.includes("/auth/refresh");

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshRequest
        ) {
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {
                    refreshPromise = api.post("/auth/refresh")
                        .finally(() => {
                            refreshPromise = null;
                        });
                }

                await refreshPromise;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("user");
                localStorage.removeItem("userId");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;