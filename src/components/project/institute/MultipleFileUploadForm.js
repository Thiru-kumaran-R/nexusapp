// FileUploadForm.js
import React from 'react';
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
    return (
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
                    onFileUpload(response.data); // Pass the response data to the parent component
                }).catch(error => {
                    // Handle the error
                }).finally(() => {
                    setSubmitting(false);
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
        </Formik>
    );
}