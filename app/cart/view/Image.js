"use client"
import React, { useRef, useEffect } from 'react';

import html2canvas from "html2canvas";
import { Button } from '@/components/ui/button';
const SaveImage = ({ orderItems, totalPrice, waitingTime }) => {

    const printRef = useRef();

    const orderCode = orderItems && orderItems[0].orderCode

    const handleSaveAsImage = async () => {
        if (!printRef.current) return;
        const canvas = await html2canvas(printRef.current);
        const dataURL = canvas.toDataURL("image/png");

        // Create a link element to download the image
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `Order_${orderCode}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        setTimeout(() => {
            handleSaveAsImage();
        }, 1000);
    }, [])



    return (
        <div className='flex flex-col items-center'>
            <div
                ref={printRef}
                className=" bg-gray-100 main-text2 mb-2 shadow-sm md:mt-2 mt-0 rounded-lg md:p-6 p-3  max-w-lg w-full mx-auto"
            >
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold text-gray-800">Foodify 2</h1>
                    <p className="text-gray-600 mt-3">Order Code : <strong>{orderCode}</strong></p>
                </div>
                <div className="mt-4">

                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Ordered Items:</h2>
                    <ul className="space-y-4">
                        {orderItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between text-gray-600 border-b pb-4"
                            >
                                {/* Food Image */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={item.imageName}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    {/* Food Details */}
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                {/* Price */}
                                <span className="font-semibold">
                                    {item.price} MMK
                                </span>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="mt-3 border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total Amount</span>
                        <span>{totalPrice} MMK</span>
                    </div>
                </div>
                <div className="mt-3 border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Waiting Time</span>
                        <span>about {waitingTime} mins</span>
                    </div>
                </div>

                <div className="mt-3 flex border-t justify-center">
                    <div className="p-4 mt-4 bg-gray-100 rounded-lg">
                        <img
                            src="/image/qr.jpg" // Replace with the QR code image URL
                            alt="Payment QR Code"
                            className="w-32 h-32"
                        />
                        <p className="text-center text-gray-500 text-sm mt-2">Scan to Pay</p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-800 text-lg font-semibold">Thanks for your attention!</p>
                    <p className="text-sm text-gray-600">We appreciate your support.</p>
                </div>
            </div>

            <Button
                onClick={handleSaveAsImage}
                className="md:mt-3 mt-5 mb-2 mx-auto main-bg main-text px-4 py-2 rounded shadow-lg "
            >
                Save as Photo
            </Button>

        </div>



    )
}

export default SaveImage
