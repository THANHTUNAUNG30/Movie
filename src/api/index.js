import axios from "axios";

export const api_key = "723c5d0e7ccb9a3f06074bda5f4680e2";

export const api = axios.create({
    baseURL : "https://api.themoviedb.org/3"
})