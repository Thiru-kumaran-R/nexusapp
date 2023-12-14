import Head from 'next/head';
import Footer from './Footer'; // Assume you have a Footer component
import Header from './Header';
import {NotificationContainers} from "@/components/notificationcontainers";
import {useEffect} from "react"; // Assume you have a Header component

export default function MainLayout({ children, title = 'Default Title' }) {




    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <NotificationContainers />
            <Header />
            <main className="main-content  flex flex-col">
                <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100"> {children}</div></main>
            <Footer />
        </>
    );
}
