import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen main-bg2 main-text2 flex flex-col items-center">
            <div className="max-w-4xl text-center mt-10 space-y-6">
                {/* Heading Section */}
                <h1 className="text-4xl font-bold  mb-6">
                    About Foodify2
                </h1>

                {/* Main Paragraph Section */}
                <p className="text-xl leading-relaxed font-medium mb-6">
                    Welcome to <span className="font-semibold ">Foodify2</span>, a simple and easy way to order food. We created this app with university students in mind, specifically for students at <span className="font-semibold ">Computer University - Mandalay</span>, to make our university welcome day a memorable occasion.
                </p>

                <p className="text-xl leading-relaxed font-medium mb-6">
                    Our goal is to make ordering food quick and stress-free. With just a few clicks, you can enjoy tasty meals without any trouble.
                </p>

                {/* Closing Paragraph */}
                <p className="text-xl leading-relaxed font-medium mb-12">
                    Thank you for choosing <span className="font-semibold ">Foodify2</span>. We’re here to make your day more delicious!
                </p>


            </div>
        </div>
    );
};

export default About;
