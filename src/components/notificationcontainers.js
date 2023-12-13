import React, { useEffect, useState } from "react";
import {getGlobalState, setGlobalState, useGlobalState} from "@/state";


// Error message container

function ErrorContainer({ error }) {
    const [text, setText] = useState("");

    useEffect(() => {
        setText(`Error: ${error}`);
    }, [error]);

    return (
        <div className="max-w-md mx-auto mt-4 p-4 border-l-4 bg-white shadow rounded-lg text-gray-700" role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    {/* Icon container */}
                    <div className="inline-block h-6 w-6 rounded-full bg-red-500 flex items-center justify-center">
                        {/* Exclamation icon */}
                        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                        </svg>
                    </div>
                </div>
                <div className="ml-3">
                    <p className="text-sm leading-5 font-medium text-red-700">{text}</p>
                </div>
            </div>
        </div>
    );
}





// Success message container
function SuccessContainer({ msg }) {
    return (
        <div className="max-w-md mx-auto mt-4 p-4 border-l-4 bg-white shadow-md rounded-lg text-gray-700" role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    {/* Icon container */}
                    <div className="inline-block h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                        {/* Check icon */}
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div className="ml-3">
                    <p className="text-sm leading-5 font-medium text-gray-700">{msg}</p>
                </div>
            </div>
        </div>
    );
}

function LoadingContainer() {
    return (
        <div className="w-full bg-gray-700 rounded-full overflow-hidden">
            <div className="striped-progress-bar"></div>
        </div>
    );
}
const timeout = 10000;


function setNotification(notification) {
    setGlobalState("notification",notification);

}

function setTimedNotification(notification) {
    setNotification(notification);
    if (timeout) {
        setTimeout(() =>   setNotification(null), timeout);
    }
}

export const showSuccess = (msg) => {
    setTimedNotification({ type: 'success', message: msg });

};
export const showError = (msg) => {
    setTimedNotification({ type: 'error', message: msg });

};
export const showProgress = () => {
    setNotification({ type: 'loader' });

};
export const hideProgress = () => {
    setNotification(null);

};

// Notification hooks
// function useNotification() {
//     const [notification, setNotification] = useGlobalState("notification");
//
//
//     return { showError, showSuccess, showProgress, hideProgress };
// }

// Notification container component
function NotificationContainers() {
    const [notification] = useGlobalState("notification");

    return (
        <div>
            {notification && (
                notification.type === 'error' && notification?.message != null ?
                    <ErrorContainer error={notification?.message} /> :
                    notification.type === 'success' ? <SuccessContainer msg={notification?.message} /> :
                        notification.type === 'loader' ? <LoadingContainer /> : null
            )}
        </div>
    );
}


export { ErrorContainer, SuccessContainer, LoadingContainer,  NotificationContainers };
