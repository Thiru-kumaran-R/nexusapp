import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from 'formik';

import * as Yup from 'yup';
import MainLayout from "@/components/layout/MainLayout";
import ErrorMessage from "@/components/ErrorMessage";
import {axiosAiClient} from "@/axiosClient";
import FileUploadForm from "@/components/project/FileUploadForm";
import ProjectDetailsForm from "@/components/project/ProjectDetailsForm";
import {useGlobalState} from "@/state";
import MultipleFileUploadForm from "@/components/project/institute/MultipleFileUploadForm";
import TemplateUploadForm from "@/components/project/institute/TemplateUploadForm";



export default function UploadIndividualProject() {
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState(null);
    const [user] = useGlobalState("user")
    const [activeTab, setActiveTab] = useState('generate');

    const handleMultipleFileUpload = (data) => {

        console.log("handleMultipleFileUpload",data)
    };
    const handleTemplateFileUpload = (data) => {

        console.log("handleMultipleFileUpload",data)
    };


    useEffect(() => {
        console.log("user",user)



    }, []);

    return (
        <MainLayout title="Upload Institute Project">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex">
                <div className="flex flex-col w-full">
                    <h1 className="text-center text-3xl font-semibold mb-6">All Projects Upload</h1>
                    <div className="flex">
                        <div className="tabs flex flex-col w-1/4 mr-8">
                            <button
                                className={`tab mb-2 ${activeTab === 'generate' ? 'tab-active' : ''}`}
                                onClick={() => setActiveTab('generate')}
                            >
                                Generate Template
                            </button>
                            <button
                                className={`tab ${activeTab === 'upload' ? 'tab-active' : ''}`}
                                onClick={() => setActiveTab('upload')}
                            >
                                Upload Template
                            </button>
                        </div>
                        <div className="tab-content w-3/4">
                            {activeTab === 'generate' && (
                                <MultipleFileUploadForm onFileUpload={handleMultipleFileUpload} />
                            )}
                            {activeTab === 'upload' && (
                                <TemplateUploadForm onFileUpload={handleTemplateFileUpload}  />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
              .tabs {
                border-right: 2px solid #ccc;
                padding-right: 20px;
              }
              .tab {
                display: block;
                padding: 10px 15px;
                cursor: pointer;
                border: 1px solid #ccc;
                border-right: none;
                text-align: left;
              }
              .tab-active {
                background: #007bff;
                color: white;
                border-color: #007bff;
              }
              .tab:not(.tab-active):hover {
                background: #f0f0f0;
              }
              .tab-content {
                padding: 0 20px;
              }
              h1 {
                color: #333;
                margin-bottom: 1rem;
              }
            `}</style>
        </MainLayout>
    );
}
