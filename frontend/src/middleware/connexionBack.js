import axios from "axios";


export const baseUrl = "http://localhost:5000/api";

export const postData = async (url, data) => {
    const response = await axios.post(`${baseUrl}/${url}`, data);
    return response;
}

export const getData = async (url) => {
    const response = await axios.get(`${baseUrl}/${url}`);
    return response.data;
}