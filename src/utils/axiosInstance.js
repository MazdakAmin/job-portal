import axios from 'axios';
import LocalStorageService from './LocalStorageService';
const axiosIntance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosIntance.interceptors.request.use(
    (config) => {
        const token = LocalStorageService.getItem('access-token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }else{
            console.warn("Local Token not found in local storage");
        }
        return config;
    },
    (error) => {
        console.error("Requset error : error");
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response){
            const status = error.response.status;
            const errorData = error.response.data;

            if(status == 422){

            }else if (status === 401){

            }else if (status === 500){

            }else{

            }
        }else{

        }
        return Promise.reject(error);
    }
);
export default axiosIntance;