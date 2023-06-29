import axios from "axios";

export const baseUrl = "http://localhost:5002/api";

export const postData = async (url, data, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${baseUrl}/${url}`, data, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getData = async (url, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${baseUrl}/${url}`, config);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
