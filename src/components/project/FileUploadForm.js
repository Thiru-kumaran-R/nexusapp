// FileUploadForm.js
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { axiosAiClient } from "@/axiosClient";
import ErrorMessage from "@/components/ErrorMessage";

const FileUploadSchema = Yup.object().shape({
    file: Yup.mixed().required('A file is required')
        .test(
            'fileType',
            'Unsupported File Format',
            value => value && ['application/pdf',    'text/plain',
                'text/markdown' ,'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type)
        ),
});

export default function FileUploadForm({ onFileUpload }) {
    return (
        <Formik
            initialValues={{ file: undefined }}
            validationSchema={FileUploadSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('file', values.file);

                axiosAiClient.post('/api/projects/uploaddocument', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // ... other headers ...
                    }
                }).then(response => {
                    onFileUpload(response.data); // Pass the response data to the parent component
                }).catch(error => {
                    // Handle the error
                }).finally(() => {
                    setSubmitting(false);
                });
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                           Choose your Project Summary File (PDF or DOCX or md or txt)
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
                            Upload
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
