import MainLayout from '@/components/layout/MainLayout';
import { useRouter } from 'next/router';

import User from "@/users/UserModel";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useGlobalState} from "@/state";
import {showSuccess} from "@/components/notificationcontainers";
import withLoggedIn from "@/guards/withLoggedIn";
import {isStudent} from "@/auth/AuthService"; // Assuming User model is properly imported

export const getServerSideProps = withLoggedIn(async (context) => {



    const { id } = context.params;

    try {
        const industry = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!industry) {
            return {
                notFound: true,
            };
        }

        return { props: { industry: JSON.parse(JSON.stringify(industry)) } };
    } catch (error) {
        // Handle the error accordingly
        console.error('Error fetching industry details:', error);
        return { props: { error: error.message } };
    }
});
const Breadcrumb = ({ title }) => {
    return (
        <nav className="bg-grey-light rounded-md w-full mb-4">
            <ol className="list-reset flex">
                <li>
                    <Link href="/students" className="text-blue-600 hover:text-blue-700">
                        Students
                    </Link>
                </li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">{title}</li>
            </ol>
        </nav>
    );
};

function getNamefromEmail(email) {
    return email.split('@')[0];

}
export default function industryDetails({ industry, error }) {
    const router = useRouter();

    const name = getNamefromEmail(industry.email)
    const [user] = useGlobalState("user");
    const [isUserStudent, setIsStudent] = useState(false); // Add user role stateS


    useEffect(() => {
        console.log(user)

        setIsStudent(isStudent())


    }, [user]);

    // Add a method to handle the apply for internship action
    const handleApplyForInternship = () => {
        // Here you would implement the logic to handle the application,
        // such as sending a request to an API or navigating to another page

        showSuccess("Applied for Internship Successfully")
        // Example: router.push('/apply-internship');
    };

    if (error) {
        console.error(error);
        return <p>An error occurred while fetching the industry details.</p>;
    }
    return (

        <MainLayout title={name || 'Industry Details'}>
            <div className="container mx-auto px-4 sm:px-8 py-4">
                <Breadcrumb title={name|| 'Industry'} />
                <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-md">
                    <div className="md:w-1/3 lg:w-1/4 mb-4 md:mb-0 flex justify-center">
                        <img
                            src={`https://via.placeholder.com/150?text=${name}`}
                            alt={`${name} Logo`}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-2/3 lg:w-3/4 md:pl-6">
                        <h1 className="text-3xl font-bold mb-4">{name}</h1>
                        <h2 className="text-xl font-semibold">Student Details</h2>
                        <div className="border-t border-gray-200 mt-2 mb-4"></div>
                        <p className="mb-2"><strong>Name:</strong> {industry.name}</p>
                        <p className="mb-4"><strong>Email:</strong> {industry.email}</p>

                    </div>
                </div>
            </div>
        </MainLayout>



    );
}
