import axios, { AxiosRequestConfig ,InternalAxiosRequestConfig} from 'axios';

import {getGlobalState} from "./state";
import {hideProgress, showError, showProgress} from "@/components/notificationcontainers";

export const axiosNoProgressClient = axios.create({
    withCredentials: true,
    baseURL: `/`,
});

axiosNoProgressClient.interceptors.request.use(
    (config) => {


    return config;
},
    (error) => {

        return Promise.reject(error);
    }
);

axiosNoProgressClient.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
