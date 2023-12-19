import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ErrorMessage from "@/components/ErrorMessage";
import React, {useState} from "react";
import TagsInput from "@/components/TagsInput";
import FormikTagsInput from "@/components/FormikTagsInput";
import {axiosAiClient} from "@/axiosClient";
import {useRouter} from "next/router";
import Link from "next/link";
import {showSuccess} from "@/components/notificationcontainers";

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
    project_type: Yup.string()
});
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

function getScoreShade(score) {
    //text-red-500
    if (score <= 20) return 'text-green-100';
    if (score <= 40) return 'text-green-300';
    if (score <= 60) return 'text-yellow-300';
    if (score <= 80) return 'text-orange-400';
    return 'text-red-500'; // Scores above 80
}

const PlagiarismDialog = ({ isOpen, plagiarismResults, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Possible Duplicates</h3>
                    <div className="mt-2 px-7 py-3 bg-gray-100 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">

                            <thead className="bg-gray-50">
                            <tr>
                                <th>Name</th>
                                <th>Summary</th>
                                <th>Source Code</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">

                            {plagiarismResults.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 text-left">

                                        <Link target="_blank" href={`/projects/${item.id}`} className="font-semibold text-gray-800 hover:text-blue-600 hover:underline" title={item.title}>

                                            {truncateText(item.title, 35)}
                                        </Link>

                                    </td>
                                    <td className={`py-2 text-right `}>
                      <span className={`font-bold px-2 py-1 rounded ${getScoreShade(item.similarity)}`} >
                        {item.similarity}%
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
};


function groupedByProjectId(data) {

    return data.reduce((acc, currentValue) => {
        // Get the project ID and embedding type
        const projectId = currentValue.project_id;
        const embeddingType = currentValue.embeddingtype;

        // Initialize the project ID group if it doesn't exist
        if (!acc[projectId]) {
            acc[projectId] = {};
        }

        // Initialize the embedding type group within the project ID group if it doesn't exist
        if (!acc[projectId][embeddingType]) {
            acc[projectId][embeddingType] = [];
        }

        // Push the current value into the appropriate array
        acc[projectId][embeddingType].push(currentValue);

        return acc;
    }, {});
}


export default function ProjectDetailsForm({ initialData }) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [plagiarismResponses, setPlagiarismResponses] = useState([]);
    const router = useRouter();
    const handleCloseDialog = () => {
        setDialogOpen(false);
        // setTimeout(() => {
        //     router.push('/projects');
        // }, 1000)
    };

    function handleSaveData(values,setSubmitting){
        console.log(values);

        axiosAiClient.post('/api/projects', values).then((response) => {
            console.log(response.data);
            console.log(response.data.result);
            console.log(response.data.result.all_plagarism_reponses);


            setSubmitting(false);
            console.log("groupedByProjectId");
            console.log(groupedByProjectId(response.data.result.all_plagarism_reponses));
            if (response.data.result.all_plagarism_reponses?.length > 0) {
                setPlagiarismResponses(response.data.result.all_plagarism_reponses);
                setDialogOpen(true); // Open the dialog if there are plagiarism responses
            }else {


            showSuccess("Project uploaded successfully")

                // setTimeout(() => {
                //     router.push('/projects');
                // }, 1000);

            }
        }).catch((error) => {
            console.error(error);
            setSubmitting(false);
        });

    }


    return (
        <>

            <PlagiarismDialog
                isOpen={isDialogOpen}
                plagiarismResults={plagiarismResponses}
                onClose={() => setDialogOpen(false)}
            />

        <Formik
            initialValues={initialData}
            validationSchema={ProjectUploadSchema}
            onSubmit={(values, { setSubmitting }) => {
                // Handle form submission here

                handleSaveData(values,setSubmitting);


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
        </>
    );
}
