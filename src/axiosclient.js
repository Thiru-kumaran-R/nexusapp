import axios, { AxiosRequestConfig ,InternalAxiosRequestConfig} from 'axios';

import {getGlobalState} from "./state";
import {hideProgress, showError, showProgress} from "@/components/notificationcontainers";

export const axiosiClient = axios.create({
    withCredentials: true,
    baseURL: `/`,
});

axiosiClient.interceptors.request.use(
    (config) => {
    // Check local storage for the token
        showProgress()
    // const token = getGlobalState("access_token");
    //
    //
    // // If the token exists, set it in the headers
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
},
    (error) => {
        showError('An error occurred during the request.');
        return Promise.reject(error);
    }
);

axiosiClient.interceptors.response.use(
    (response) => {

        hideProgress();
        return response;
    },
    (error) => {

        showError(error.response?.data?.message || 'An error occurred during the response.');
        return Promise.reject(error);
    }
);
