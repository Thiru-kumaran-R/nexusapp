import {useEffect, useState} from "react";
import {axiosAiClient} from "@/axiosClient";
import MainLayout from "@/components/layout/MainLayout";
import withLoggedIn from "@/guards/withLoggedIn";
import Link from "next/link";

export const getServerSideProps = withLoggedIn(async (context) => {



        // console.log(users)
        return { props:{} };


});

export default function AllProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axiosAiClient.get('/api/allprojects').then((response) => {
            setProjects(response.data);
        })
    }, []);

    return (
        <MainLayout title="All Projects">
            <div className="container mx-auto px-4 sm:px-8">
                <h1 className="text-2xl font-semibold mb-8">Welcome to the projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                            <p className="text-gray-700 text-base mb-4">
                                {project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}
                            </p>
                            <p className="text-gray-600 text-xs mb-2">Date Created: {new Date(project.date_created).toLocaleDateString()}</p>
                            <div className="mb-4">
                                <strong>Categories:</strong>
                                <ul className="list-disc pl-5">
                                    {project.categories.map((category, catIndex) => (
                                        <li key={catIndex} className="text-gray-600 text-sm">{category}</li>
                                    ))}
                                </ul>
                            </div>
                            <Link href={`/projects/${project.id}`}>
                                <a className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                    View
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}