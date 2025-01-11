"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const OrderSuccessful = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    // const [userData, setUserData] = useState(null);

    useEffect(() => {
        // const storedUserData = localStorage.getItem("user-data");
        // if (storedUserData) {
        //     setUserData(JSON.parse(storedUserData));
        // }

        const timer = setTimeout(() => {
            setShowConfetti(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="flex flex-col justify-center items-center w-full h-full bg-gradient-to-br main-bg main-text md:p-0 p-2">
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="absolute inset-0 overflow-hidden">
                    <div className="animate-pulse w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 opacity-20 blur-lg"></div>
                </div>
            )}

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                {/* Success Icon */}
                <div className="p-6 bg-white rounded-full shadow-lg flex items-center justify-center w-24 h-24">
                    <svg
                        className="w-16 h-16 text-gray-600 animate-bounce"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 33"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m0 6a9 9 0 11-18 0 9 9 20 0118 0z"
                        />
                    </svg>
                </div>

                {/* Success Message */}
                <h1 className="text-3xl  font-bold animate-fade-in">
                    Order Placed Successfully!
                </h1>
                <p className="text-lg  animate-fade-in">
                    Thank you for your order. Your delicious items will get soon!
                </p>

                {/* Redirect Button */}
                <Link
                    href={`/cart/history`}
                    className="main-bg2 border-3 border-gray-900 text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-gray-500 transition-transform transform hover:scale-110 focus:outline-none animate-slide-in"
                >
                    View Order History
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccessful;
