// FileUploadForm.js
import React, {useState} from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { axiosAiClient } from "@/axiosClient";
import ErrorMessage from "@/components/ErrorMessage";

const FileUploadSchema = Yup.object().shape({
    files: Yup.array()
        .of(
            Yup.mixed()
                .required('A file is required')
                .test(
                    'fileType',
                    'Unsupported File Format',
                    value => value && [
                        'application/pdf',
                        'text/plain',
                        'text/markdown',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ].includes(value.type)
                )
        )
        .required('At least one file is required'),
});

export default function MultipleFileUploadForm({ onFileUpload }) {

    const [downloadUrl, setDownloadUrl] = useState(null);
    const [canShowForm, setShowForm] = useState(true); // New state to track upload success




    return (
        <>
        {downloadUrl && (
            // Only show the download link if uploadSuccess is true
            <div className="flex justify-start">
                <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Download your Project Upload Template
                </a>
            </div>
        )}

            {canShowForm && (
        <Formik
            initialValues={{ files: [] }}
            validationSchema={FileUploadSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                // Array.from(values.files).forEach((file, index) => {
                //     formData.append(`files[${index}]`, file);
                // });

                Array.from(values.files).forEach((file) => {
                    formData.append('files', file); // Notice we don't use 'files[]' or indices here
                });

                axiosAiClient.post('/api/projects/createtemplate', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // ... other headers ...
                    }
                }).then(response => {
                    setDownloadUrl(response.data.url);
                    setShowForm(false); // Set the upload success state to true

                    onFileUpload(response.data); // Pass the response data to the parent component
                }).catch(error => {
                    setSubmitting(false);
                    // Handle the error
                }).finally(() => {
                    //setSubmitting(false);
                });
            }}
        >
            {({ setFieldValue, isSubmitting, errors, touched }) => (
                <Form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            Choose project files (PDF, DOCX, MD, TXT) to generate a template
                        </label>
                        <input
                            id="file"
                            name="files"
                            type="file"
                            onChange={(event) => {
                                // Convert FileList to array
                                const filesArray = Array.from(event.currentTarget.files);
                                setFieldValue('files', filesArray);
                            }}
                            multiple
                            className="form-input"
                        />
                        <ErrorMessage name="files" component="div" className="error-message" />
                    </div>
                    <div>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            Upload
                        </button>
                    </div>
                </Form>
            )}
        </Formik>    )}
        </>
    );
}