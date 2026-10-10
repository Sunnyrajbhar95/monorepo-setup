import axios from "axios";

const apiBaseUr =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1/";

const apiBaseUrl = axios.create({
  baseURL: apiBaseUr,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor
apiBaseUr.interceptors.request.use(
  (config) => {
    // Browser cookie ko automatically attach kar sakta hai.
    // Cookie ko manually set karne ki zaroorat nahi hai.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
apiBaseUr.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Network error ya request config missing hai
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    // Sirf 401 par refresh try karo
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        // Apne backend ke actual HTTP method ke according use karo.
        // Example: agar refresh route POST hai:
        await apiBaseUr.post("/auth/refresh-token");

        // Backend cookie set/refresh karega.
        // Browser eligible cookie automatically send karega.
        return apiBaseUr(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiBaseUrl;
