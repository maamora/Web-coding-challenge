import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

export default api;