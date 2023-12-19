import React from 'react';
import MainLayout from "@/components/layout/MainLayout";

import { useRouter } from 'next/router';

import {useEffect, useState} from "react";
import {axiosAiClient} from "@/axiosClient";

import withLoggedIn from "@/guards/withLoggedIn";
import Link from "next/link";
import {ChatBotComponent} from "@/panel/ChatBotComponent";
import {setLoadingState} from "@/panel/config";

const Breadcrumb = ({ title,id }) => {
    return (
        <nav className="bg-grey-light rounded-md w-full mb-4">
            <ol className="list-reset flex">
                <li>
                    <Link href="/projects" className="text-blue-600 hover:text-blue-700">
                        Projects
                    </Link>
                </li>
                <li><span className="text-blue-600 mx-2">/</span></li>
                <li>
                    <Link href={`/projects/${id}`} className="text-blue-600 hover:text-blue-700">
                        {title}
                    </Link>
                </li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">Chat</li>
            </ol>
        </nav>
    );
};




export const getServerSideProps = withLoggedIn(async (context) => {



    // console.log(users)
    return { props:{} };


});

const ChatBotWithHttp = ({id}) => {


    const handleMessage = async (message) => {


        try {




            const result = await axiosAiClient.get('/api/answer?question=' + message.data + "&projectid=" + id);


            console.log(result.data.result)
            return {text: result.data.result }

        } catch (e) {

            console.log(e)
            return {text: "Unable to get answer" + e.message || "" }

            // handle error
        }

    };


    const options = {
        botImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Boss-icon.png",
        speechRecognition: false,
        textToSpeech: true,
        inputBoxPlaceholder: 'Your Text Here',

    }


    return <ChatBotComponent options={options} handleMessage={handleMessage} />
}

export  function  ProjectDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [project, setProject] = React.useState(null);

    // Chat Implement here

    React.useEffect(() => {
        if (id) {
            axiosAiClient.get(`/api/projects/${id}`).then((response) => {
                console.log(response.data)
                const project = response.data;
                project.members = project.members ? project.members : [];
                setProject(project);
            });
        }
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (

        <MainLayout title="Chat With Project">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Breadcrumb title={project.title} id={project.id} />
                <h1 className="text-2xl font-semibold mb-8">Chat With {project.title}</h1>
                <ChatBotWithHttp id={id}>
                </ChatBotWithHttp>
            </div>
        </MainLayout>


    );
};

export default ProjectDetails;
