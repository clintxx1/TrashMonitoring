import axios from "axios";
import auth from "./services";

export default axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        "x-access-token": auth.getToken()
    }
})