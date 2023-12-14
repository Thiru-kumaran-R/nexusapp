import React, {useEffect} from 'react';
import {Field, Form, Formik} from 'formik';

import * as Yup from 'yup';
import MainLayout from "@/components/layout/MainLayout";
import ErrorMessage from "@/components/ErrorMessage";
import {axiosAiClient} from "@/axiosClient";



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

export default function ProjectUploadForm() {

    useEffect(() => {

        axiosAiClient.get('/api/answer').then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            console.error(error.config);
        });


    }, []);

    return (
        <MainLayout title="Upload Individual Project">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg w-full space-y-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Upload Individual Project
                    </h2>

                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            domain: '',
                            topics: '',
                            theme: '',
                            demoUrl: '',
                            sourceCodeUrl: '',
                            projectSummary: '',
                            file: undefined,
                        }}
                        validationSchema={ProjectUploadSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            // Handle form submission here
                            // You'll likely want to convert this to FormData to submit to your backend
                            console.log(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ setFieldValue, isSubmitting }) => (
                            <Form className="mt-8 space-y-6">
                                <Field name="title" className="form-input" placeholder="Title" />
                                <ErrorMessage name="title" component="div" className="error-message" />

                                {/* ... other fields ... */}

                                <Field name="description" className="form-input" placeholder="Description" as="textarea" />
                                <ErrorMessage name="description" component="div" className="error-message" />

                                {/* ... other fields ... */}

                                <Field name="domain" className="form-input" placeholder="Domain" />
                                <ErrorMessage name="domain" component="div" className="error-message" />

                                {/* ... other fields ... */}

                                <Field name="topics" className="form-input" placeholder="Topics" />
                                <ErrorMessage name="topics" component="div" className="error-message" />

                                {/* ... other fields ... */}

                                <Field name="theme" className="form-input" placeholder="Theme" />
                                <ErrorMessage name="theme" component="div" className="error-message" />

                                <Field name="demoUrl" className="form-input" placeholder="Demo URL" />
                                <ErrorMessage name="demoUrl" component="div" className="error-message" />

                                <Field name="sourceCodeUrl" className="form-input" placeholder="Source Code URL" />
                                <ErrorMessage name="sourceCodeUrl" component="div" className="error-message" />

                                <Field name="projectSummary" className="form-input" placeholder="Project Summary" as="textarea" />
                                <ErrorMessage name="projectSummary" component="div" className="error-message" />

                                <div>
                                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                        Project File
                                    </label>
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            setFieldValue('file', event.currentTarget.files[0]);
                                        }}
                                        className="form-input"
                                    />
                                    <ErrorMessage name="file" component="div" className="error-message" />
                                </div>

                                <div>
                                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                        Submit Project
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </MainLayout>
    );
}
