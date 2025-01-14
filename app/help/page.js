"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const HelpPage = () => {
    return (
        <div className="flex flex-col items-center justify-start mt-10 min-h-screen main-bg2 main-text2 px-6 py-8">
            <h1 className="text-4xl font-bold mb-6">Need Help?</h1>
            <p className="text-lg mb-4">
                We're here to assist you! If you have any questions or need support, feel free to reach out.
            </p>
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                <p className="text-lg mb-4">
                    📞 <span className="font-medium">Phone:</span> <a href="tel:+959445741581" className="underline">+95 9445741581</a>
                </p>

            </div>
            <div className="mt-6">
                <Button asChild>
                    <Link href={"/"} className="px-6 py-2 main-bg main-text font-medium rounded-md shadow-lg ">
                        Go Back Home
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default HelpPage;
