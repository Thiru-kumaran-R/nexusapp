import MainLayout from '@/components/layout/MainLayout';
import { useRouter } from 'next/router';

import User from "@/users/UserModel";
import Link from "next/link";
import React from "react"; // Assuming User model is properly imported

export const getServerSideProps = async (context) => {
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
};
const Breadcrumb = ({ title }) => {
    return (
        <nav className="bg-grey-light rounded-md w-full mb-4">
            <ol className="list-reset flex">
                <li>
                    <Link href="/projects" className="text-blue-600 hover:text-blue-700">
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
            <Breadcrumb title={institution.institutionName || 'Institution'} />
            <div className="container mx-auto px-4 sm:px-8 py-4">
                <h1 className="text-2xl font-semibold mb-4">{institution.institutionName}</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600 text-sm mb-4">Email: {institution.email}</p>
                    <p className="text-gray-600 text-sm mb-4">ID: {institution.id}</p>

                </div>
            </div>
        </MainLayout>
    );
}
