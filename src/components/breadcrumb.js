import Link from "next/link";
import React from "react";

const Breadcrumb = ({ url,label,title }) => {
    return (
        <nav className="bg-grey-light rounded-md w-full mb-4">
            <ol className="list-reset flex">
                <li>
                    <Link href={{url}} className="text-blue-600 hover:text-blue-700">
                        {label}
                    </Link>
                </li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-gray-500">{title}</li>
            </ol>
        </nav>
    );
};