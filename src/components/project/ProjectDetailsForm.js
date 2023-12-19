import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ErrorMessage from "@/components/ErrorMessage";
import React from "react";
import TagsInput from "@/components/TagsInput";
import FormikTagsInput from "@/components/FormikTagsInput";
import {axiosAiClient} from "@/axiosClient";

const ProjectUploadSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    summary_file: Yup.string().url('Enter a valid URL').required('Summary file is required'),
    institute: Yup.string().required('Institute is required'),
    prototype_demo: Yup.string().url('Enter a valid URL'),
    prototype_sourcecode: Yup.string().url('Enter a valid URL'),
    theme: Yup.string().required('Theme is required'),
    domain: Yup.string().required('Domain is required'),
    projectSummary: Yup.string().required('Project Summary is required'),
    project_type: Yup.string(),
});

export default function ProjectDetailsForm({ initialData }) {
    return (
        <Formik
            initialValues={initialData}
            validationSchema={ProjectUploadSchema}
            onSubmit={(values, { setSubmitting }) => {
                // Handle form submission here
                console.log(values);

                axiosAiClient.post('/api/projects', values).then((response) => {
                    console.log(response.data);

                    //Agalya & Team TODO start working from here????

                    setSubmitting(false);
                })



            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                    <Field name="title" className="form-input" placeholder="Title" />
                    <ErrorMessage name="title" component="div" className="error-message" />

                    <Field name="description" className="form-input" placeholder="Description" as="textarea" />
                    <ErrorMessage name="description" component="div" className="error-message" />

                    <Field name="domain" className="form-input" placeholder="Domain" />
                    <ErrorMessage name="domain" component="div" className="error-message" />

                    <Field name="theme" className="form-input" placeholder="Theme" />
                    <ErrorMessage name="theme" component="div" className="error-message" />

                    <Field name="prototype_demo" className="form-input" placeholder="Demo URL" />
                    <ErrorMessage name="prototype_demo" component="div" className="error-message" />

                    <Field name="prototype_sourcecode" className="form-input" placeholder="Source Code URL" />
                    <ErrorMessage name="prototype_sourcecode" component="div" className="error-message" />

                    <Field name="projectSummary" className="form-input" placeholder="Project Summary" as="textarea" />
                    <ErrorMessage name="projectSummary" component="div" className="error-message" />

                    <Field name="institute" className="form-input" placeholder="Institute" />
                    <ErrorMessage name="institute" component="div" className="error-message" />


                    <FormikTagsInput name="members" placeholder="Add a member" />


                    <FormikTagsInput name="categories" placeholder="Add a category" />

                    <Field type="hidden" name="summary_file" />
                    <Field type="hidden" name="project_type" />

                    <div>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            Submit Project
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
