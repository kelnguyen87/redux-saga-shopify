import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://171.244.51.242:5012',
    timeout: 1000,
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    //document.body.classList.add('loading-indicator');

    // you can also do other modification in config
    return config;

}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {

    if(response.status === 401) {
        // your failure logic
    }
    // spinning hide
    // UPDATE: Add this code to hide global loading indicator
    //document.body.classList.remove('loading-indicator');

    return response;
}, function (error) {
    return Promise.reject(error);
});
