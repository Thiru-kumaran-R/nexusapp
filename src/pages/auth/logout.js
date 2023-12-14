import {useEffect} from "react";
import MainLayout from "@/components/layout/MainLayout";
import {useRouter} from 'next/router';
import {axiosLocalClient} from "@/axiosClient";

import {removeAuthFromStorage} from "@/auth/AuthService";


export default function Logout({ data, error }) {



   async function logout(){
        try {
            // If you have an API route for logging out, call it here
            await axiosLocalClient.post('/api/auth/logout');

            removeAuthFromStorage();
            // Optionally clear any global state or local storage

            // Redirect to the login page or home page
          window.location.href = '/auth/login';
        } catch (error) {
            console.error('Logout failed', error);
            // Optionally show an error message to the user
        }
    }


        logout()



    return (
        <MainLayout title="logging out">
            <h1>Logging Out...</h1>
        </MainLayout>
    );
}