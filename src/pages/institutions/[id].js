import MainLayout from '@/components/layout/MainLayout';
import { useRouter } from 'next/router';

import User from "@/users/UserModel";
import Link from "next/link";
import React from "react";
import withLoggedIn from "@/guards/withLoggedIn"; // Assuming User model is properly imported

export const getServerSideProps = withLoggedIn(async (context) => {

    const { id } = context.params;

    try {
        const institution = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!institution) {
            return {
                notFound: true,
            };
        }

        return { props: { institution: JSON.parse(JSON.stringify(institution)) } };
    } catch (error) {
        // Handle the error accordingly
        console.error('Error fetching institution details:', error);
        return { props: { error: error.message } };
    }
});
const Breadcrumb = ({ title }) => {
    return (
        <nav className="bg-grey-light rounded-md w-full mb-4">
            <ol className="list-reset flex">
                <li>
                    <Link href="/institutions" className="text-blue-600 hover:text-blue-700">
                        Institutes
                    </Link>
                </li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">{title}</li>
            </ol>
        </nav>
    );
};
export default function InstitutionDetails({ institution, error }) {
    const router = useRouter();

    if (error) {
        // Render or log the error message
        console.error(error);
        return <p>An error occurred while fetching the institution details.</p>;
    }

    return (



        <MainLayout title={institution.institutionName || 'Institution Details'}>

            <div className="container mx-auto px-4 sm:px-8 py-4">
                <Breadcrumb title={institution.institutionName || 'Institution'} />
                <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-md">
                    <div className="md:w-1/3 lg:w-1/4 mb-4 md:mb-0 flex justify-center">
                        <img
                            src={`https://via.placeholder.com/150?text=${institution.institutionName}`}
                            alt={`${institution.institutionName} Logo`}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-2/3 lg:w-3/4 md:pl-6">
                        <h1 className="text-3xl font-bold mb-4">{institution.institutionName}</h1>
                        <h2 className="text-xl font-semibold">Industry Details</h2>
                        <div className="border-t border-gray-200 mt-2 mb-4"></div>
                        <p className="mb-2"><strong>Name:</strong> {institution.institutionName}</p>
                        <p className="mb-4"><strong>Email:</strong> {institution.email}</p>

                    </div>
                </div>
            </div>
        </MainLayout>

    );
}
