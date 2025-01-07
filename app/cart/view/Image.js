"use client"
import React, { useRef } from 'react';

import html2canvas from "html2canvas";
const SaveImage = ({ orderItems, totalPrice, waitingTime }) => {
    let orderCode = "akwh709237"
    const printRef = useRef();

    const handleSaveAsImage = async () => {
        if (!printRef.current) return;
        const canvas = await html2canvas(printRef.current);
        const dataURL = canvas.toDataURL("image/png");

        // Create a link element to download the image
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `Order_${orderItems.orderCode}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            <div
                ref={printRef}
                className="bg-white shadow-lg mt-5 rounded-lg p-6 w-full max-w-lg "
            >
                <h1 className="text-2xl font-bold text-center text-violet-600 mb-4">
                    Order Summary
                </h1>
                <p className="text-sm text-gray-500 text-center">
                    Order Code: <span className="font-semibold">{orderCode}</span>
                </p>
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
                                <span className="text-violet-600 font-semibold">
                                    ${item.price.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                        Total: <span className="text-violet-600">{totalPrice}</span>
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-700">
                        Waiting Time: <span className="text-violet-600">{waitingTime}</span>
                    </h3>
                </div>
            </div>
            <button
                onClick={handleSaveAsImage}
                className="mt-6 bg-violet-600 text-white px-4 py-2 rounded shadow-lg hover:bg-violet-700"
            >
                Save as Photo
            </button>
        </>
    )
}

export default SaveImage
