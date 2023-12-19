import MainLayout from '@/components/layout/MainLayout';
import {useEffect} from "react";
import {showError} from "@/components/notificationcontainers";
import {getAxiosErrorMessage} from "@/shared/errorFormatter";
import User from "@/users/UserModel";
import withLoggedIn from "@/guards/withLoggedIn";
import Link from "next/link";


export const getServerSideProps = withLoggedIn(async (context) => {


    try {

        const userType="institution"

        const users = await User.findAll({
            where: { userType },
            attributes: { exclude: ['password'] }
        });

        // console.log(users)
        return { props: { data:JSON.parse(JSON.stringify(users)), error: null } };
    } catch (error) {


        return { props: { data: [], error: getAxiosErrorMessage(error) } };

    }


});



export default function Institutions({ data, error }) {

    useEffect(() => {
        console.log(data)
        if(error)
            showError(error)
    }, []);


    return (
        <MainLayout title="Institutes">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-semibold mb-8">Total Institutes: {data.length}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((institution) => (
                        <div key={institution.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-bold mb-2">{institution.institutionName || 'Unnamed Institution'}</h2>
                            <p className="text-gray-600 text-sm">Email: {institution.email}</p>
                            <p className="text-gray-600 text-sm">ID: {institution.id}</p>
                            <Link href={`/institutions/${institution.id}`} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">

                                    View

                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>

    );
}