import axios, { AxiosRequestConfig ,InternalAxiosRequestConfig} from 'axios';

import {getGlobalState} from "./state";
import {hideProgress, showError, showProgress} from "@/components/notificationcontainers";

export const axiosClient = axios.create({
    withCredentials: true,
    baseURL: `/`,
});

axiosClient.interceptors.request.use(
    (config) => {
        showProgress()
    return config;
},
    (error) => {
        showError('An error occurred during the request.');
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {

        hideProgress();
        return response;
    },
    (error) => {

        showError(error.response?.data?.message || 'An error occurred during the response.');
        return Promise.reject(error);
    }
);
