// FileUploadForm.js
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { axiosAiClient } from "@/axiosClient";
import ErrorMessage from "@/components/ErrorMessage";
import {showSuccess} from "@/components/notificationcontainers";

const FileUploadSchema = Yup.object().shape({
    file: Yup.mixed().required('A file is required')
        .test(
            'fileType',
            'Unsupported File Format',
            value => value && ['application/csv',    'text/csv'].includes(value.type)
        ),
});

export default function TemplateUploadForm({ onFileUpload }) {
    return (
        <Formik
            initialValues={{ file: undefined }}
            validationSchema={FileUploadSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('file', values.file);

                axiosAiClient.post('/api/projects/uploadmultipleprojecttemplate', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // ... other headers ...
                    }
                }).then(response => {
                    onFileUpload(response.data); // Pass the response data to the parent component
                    showSuccess("Template Uploaded Successfully, and processing started")
                }).catch(error => {
                    setSubmitting(false);
                    // Handle the error
                }).finally(() => {
                });
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            Choose your Template File (CSV)
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
                            Upload Template
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
