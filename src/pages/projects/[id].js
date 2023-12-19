import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { axiosAiClient } from "@/axiosClient";
import { useRouter } from 'next/router';

export  function  ProjectDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = React.useState(null);

    React.useEffect(() => {
        if (id) {
            axiosAiClient.get(`/api/project/${id}`).then((response) => {
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
            <div className="container mx-auto px-4 sm:px-8">
                <h1 className="text-2xl font-semibold mb-8">{project.title}</h1>
                <p>{project.description}</p>
                {/* More detailed information can go here */}
            </div>
        </MainLayout>
    );
};

export default ProjectDetails;
