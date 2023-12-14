import MainLayout from '../components/layout/MainLayout';
import {useEffect} from "react";
import {showError} from "@/components/notificationcontainers";
import {getAxiosErrorMessage} from "@/shared/errorFormatter";
import User from "@/users/UserModel";
import withLoggedIn from "@/guards/withLoggedIn";


export const getServerSideProps = withLoggedIn(async (context) => {


    try {
        console.log("connecting getServerSideProps")
        const users = await User.findAll()

        // console.log(users)
        return { props: { data:JSON.parse(JSON.stringify(users)), error: null } };
    } catch (error) {


        return { props: { data: [], error: getAxiosErrorMessage(error) } };

    }


});



export default function Welcome({ data, error }) {

    useEffect(() => {
        if(error)
            showError(error)
    }, []);


    return (
        <MainLayout title="Home Page">
            <h1>Welcome Home {data.length}</h1>
        </MainLayout>
    );
}