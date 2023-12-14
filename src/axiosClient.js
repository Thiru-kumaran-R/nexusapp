import axios from 'axios';
import {hideProgress, showError, showProgress} from "@/components/notificationcontainers";
import {getGlobalState} from "@/state";
import {getAccessToken} from "@/auth/AuthService";




function setupInterceptorsToProgress(client) {

    client.interceptors.request.use(
        (config) => {
            showProgress()
            return config;
        },
        (error) => {
            showError('An error occurred during the request.');
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        (response) => {

            hideProgress();
            return response;
        },
        (error) => {

            showError(error.response?.data?.message || 'An error occurred during the response.');
            return Promise.reject(error);
        }
    );

}
function setupAiApiInterceptorsToProgress(client) {

    client.interceptors.request.use(
        (config) => {

            const token =getAccessToken()

            console.log("token",token)
            if (token) {
              config.headers['Authorization'] = 'Bearer ' + token; // Append the token to the Authorization header
            }


            showProgress()
            return config;
        },
        (error) => {
            showError('An error occurred during the request.');
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        (response) => {

            hideProgress();
            return response;
        },
        (error) => {

            showError(error.response?.data?.message || 'An error occurred during the response.');
            return Promise.reject(error);
        }
    );

}

export const axiosLocalClient = axios.create({
    withCredentials: true,
    baseURL: `/`,
});

export const axiosAiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AI_API_ENDPOINT,
});
console.log("AI_API_ENDPOINT",process.env.NEXT_PUBLIC_AI_API_ENDPOINT)

setupInterceptorsToProgress(axiosLocalClient);
setupAiApiInterceptorsToProgress(axiosAiClient);