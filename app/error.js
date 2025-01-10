"use client";

import React from "react";
import Link from "next/link";

const ErrorPage = ({ errorMessage = "Something went wrong", showBackButton = true }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="p-6 text-center bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-gray-700 mb-6">{errorMessage}</p>
                {showBackButton && (
                    <Link href="/">
                        <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Go Back to Home
                        </a>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ErrorPage;
