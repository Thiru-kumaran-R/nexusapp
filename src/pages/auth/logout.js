import {useEffect} from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useRouter } from 'next/router';
import {axiosClient} from "@/axiosclient";

import {removeAuthFromStorage} from "@/auth/AuthService";



export default function Logout({ data, error }) {
    const router = useRouter();


   async function logout(){
        try {
            // If you have an API route for logging out, call it here
            await axiosClient.post('/api/auth/logout');

            removeAuthFromStorage();
            // Optionally clear any global state or local storage

            // Redirect to the login page or home page
            router.push('/auth/login');
        } catch (error) {
            console.error('Logout failed', error);
            // Optionally show an error message to the user
        }
    }

    useEffect(() => {
        logout()
    }, []);


    return (
        <MainLayout title="logging out">
            <h1>Logging Out...</h1>
        </MainLayout>
    );
}