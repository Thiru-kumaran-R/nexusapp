import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from 'formik';

import * as Yup from 'yup';
import MainLayout from "@/components/layout/MainLayout";
import ErrorMessage from "@/components/ErrorMessage";
import {axiosAiClient} from "@/axiosClient";
import FileUploadForm from "@/components/project/FileUploadForm";
import ProjectDetailsForm from "@/components/project/ProjectDetailsForm";
import {useGlobalState} from "@/state";



const ProjectUploadSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    domain: Yup.string().required('Domain is required'),
    topics: Yup.string().required('Topics are required'),
    theme: Yup.string().required('Theme is required'),
    demoUrl: Yup.string().url('Enter a valid URL'),
    sourceCodeUrl: Yup.string().url('Enter a valid URL'),
    projectSummary: Yup.string().required('Project Summary is required'),
    file: Yup.mixed().required('A file is required'),
});

export default function UploadIndividualProject() {
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState(null);
    const [user] = useGlobalState("user")


    const handleFileUpload = (data) => {
        setProjectData({

            summary_file: data.url,
            "project_type": "student",
            "members": [user.email],
          "categories":[],
            ...data.content, // Spread the response content into initialValues

            // ... other fields if necessary ...
        });
        setStep(2); // Move to the next step
    };


    useEffect(() => {
        console.log("user",user)
        //
        // axiosAiClient.get('/api/answer').then((response) => {
        //     console.log(response.data);
        // }).catch((error) => {
        //     console.log(error);
        //     if (error.response) {
        //         // The request was made and the server responded with a status code
        //         // that falls out of the range of 2xx
        //         console.error(error.response.data);
        //         console.error(error.response.status);
        //         console.error(error.response.headers);
        //     } else if (error.request) {
        //         // The request was made but no response was received
        //         console.error(error.request);
        //     } else {
        //         // Something happened in setting up the request that triggered an Error
        //         console.error('Error', error.message);
        //     }
        //     console.error(error.config);
        // });


    }, []);

    return (
        <MainLayout title="Upload Individual Project">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full space-y-8">
                    {step === 1 && (
                        <FileUploadForm onFileUpload={handleFileUpload} />
                    )}
                    {step === 2 && projectData && (
                        <ProjectDetailsForm initialData={projectData} />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
