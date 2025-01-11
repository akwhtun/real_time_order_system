"use client";

import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import { postOrderData } from "@/app/libs/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
const FoodOrderConfirmPage = () => {
    const [userData, setUserData] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [error, setError] = useState();

    const router = useRouter()

    useEffect(() => {
        // Load user data from localStorage
        const storedUserData = JSON.parse(localStorage.getItem("user-data"));
        if (!storedUserData) {
            router.push("/cart/user")
            return
        }
        setUserData(storedUserData);

        // Load cart items from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem("food-in-cart")) || [];
        setCartItems(storedCartItems);

        // Calculate total cost
        const total = storedCartItems.reduce((acc, item) => acc + item.price * item.count, 0);

        setTotalCost(total);
    }, []);

    const handleConfirmOrder = async () => {
        // alert("Order confirmed! Thank you for your purchase.");
        try {
            const data = await postOrderData(cartItems, userData)
            if (data.error) {
                setError(data.error);
            } else {
                localStorage.removeItem("food-in-cart");

                const event = new Event("cartUpdate");
                window.dispatchEvent(event);

                router.push("/cart/orderSuccess")
            }
        } catch (err) {
            setError(err.message || "An unknown error occurred.");
        }
    };

    const handleRenameInfo = () => {
        localStorage.removeItem("user-data");
        router.push("/cart/user")
    }

    return (
        <div className="h-[520px] overflow-scroll mx-auto p-6  container">
            <h1 className="text-3xl font-bold text-center mb-8">Order Confirmation</h1>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
            {userData && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Your Information</h2>
                    <div className="bg-white p-4 border rounded-md shadow-md">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Phone:</strong> {userData.phone}</p>
                    </div>

                    {/* Rename Info Button */}
                    <button
                        onClick={handleRenameInfo}

                        className="mt-4 px-4 py-2 main-text2 main-bg2 border-2 border-gray-700 rounded-md shadow  transition-transform transform hover:scale-105 focus:outline-none"
                    >
                        Rename Info
                    </button>
                </div>

            )}

            {cartItems.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <OrderSummary cartItems={cartItems} totalCost={totalCost} />
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Total Cost</h2>
                <div className="bg-white p-4 border rounded-md shadow-md">
                    <p className="text-lg font-bold">Total:   {totalCost} MMK</p>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <Button asChild>
                    <Link href={"/"} variant="outlined" className="main-bg2 main-text2 border-2 border-gray-700 hover:text-white" >Back to Menu</Link>
                </Button>
                <Button
                    onClick={handleConfirmOrder}
                    disabled={!confirmOrder}
                    className="main-bg main-text"
                >
                    Confirm Order
                </Button>
            </div>

            <div className="mt-4 text-center">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="mr-2"
                        onChange={() => setConfirmOrder(!confirmOrder)}
                    />
                    I confirm that the above details are correct
                </label>
            </div>
        </div>
    );
};

export default FoodOrderConfirmPage;
