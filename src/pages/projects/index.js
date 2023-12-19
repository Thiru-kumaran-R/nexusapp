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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-semibold mb-8">All Projects</h1>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                    {projects.map((project, index) => (
                        <div key={index} className="break-inside-avoid p-4 bg-white rounded-lg shadow-md mb-4">
                            <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                            <p className="text-gray-700 text-sm mb-4">
                                {project.description.length > 150 ? project.description.substring(0, 150) + '...' : project.description}
                            </p>
                            <div className="text-gray-600 text-xs mb-4">Date Created: {new Date(project.date_created).toLocaleDateString()}</div>
                            <div className="mb-4">
                                <strong className="font-bold">Categories:</strong>
                                <ul className="list-disc list-inside">
                                    {project.categories.map((category, catIndex) => (
                                        <li key={catIndex} className="text-gray-600 text-sm">{category}</li>
                                    ))}
                                </ul>
                            </div>


                            <Link href={`/projects/${project.id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">

                                View

                        </Link>
                        </div>
                        ))}
                </div>
            </div>
        </MainLayout>
    );
}