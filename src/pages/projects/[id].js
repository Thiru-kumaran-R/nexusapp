import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { axiosAiClient } from "@/axiosClient";
import { useRouter } from 'next/router';
import Link from "next/link";

const Breadcrumb = ({ title }) => {
    return (
        <nav className="bg-grey-light rounded-md w-full mb-4">
            <ol className="list-reset flex">
                <li>
                    <Link href="/projects" className="text-blue-600 hover:text-blue-700">
                        Projects
                    </Link>
                </li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">{title}</li>
            </ol>
        </nav>
    );
};

export  function  ProjectDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = React.useState(null);

    React.useEffect(() => {
        if (id) {
            axiosAiClient.get(`/api/projects/${id}`).then((response) => {
                console.log(response.data)
                setProject(response.data);
            });
        }
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <MainLayout title={project.title}>
            <div className="container mx-auto px-4 sm:px-8 py-4">
                <Breadcrumb title={project.title} />
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <p className="text-lg text-gray-700 mb-6">{project.description}</p>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Project Details</h2>
                        <div className="border-t border-gray-200 mt-2 mb-4"></div>
                        <p><strong>Domain:</strong> {project.domain}</p>
                        <p><strong>Theme:</strong> {project.theme}</p>
                        <p><strong>Institute:</strong> {project.institute}</p>
                        <p><strong>Date Created:</strong> {new Date(project.date_created).toLocaleDateString()}</p>
                        <p><strong>Date Updated:</strong> {new Date(project.date_updated).toLocaleDateString()}</p>
                        <p><strong>Summary File:</strong> <a href={project.summary_file} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Summary</a></p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Members</h2>
                        <div className="border-t border-gray-200 mt-2 mb-4"></div>
                        <ul>
                            {project.members.map((member, index) => (
                                <li key={index} className="text-gray-600">{member}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Categories</h2>
                        <div className="border-t border-gray-200 mt-2 mb-4"></div>
                        <ul className="flex flex-wrap gap-2">
                            {project.categories.map((category, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{category}</span>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProjectDetails;
