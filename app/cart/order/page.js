"use client";

import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import { postOrderData } from "@/app/libs/fetcher";

const FoodOrderConfirmPage = () => {
    const [userData, setUserData] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        // Load user data from localStorage
        const storedUserData = JSON.parse(localStorage.getItem("user-data"));
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
        const res = await postOrderData(cartItems, userData)


        if (res.ok) {
            const data = await res.json()
            console.log(data.message);

            localStorage.removeItem("food-in-cart");
            localStorage.removeItem("user-data");

            // const event = new Event("cartUpdate");
            // window.dispatchEvent(event);

        } else {
            const errorData = await res.json();
            setError(errorData.error)
        }
    };

    return (
        <div className="container mx-auto p-6">
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
                    <p className="text-lg font-bold">Total:   {totalCost}</p>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <Button variant="outlined" onClick={() => alert("Going back to menu.")}>Back to Menu</Button>
                <Button
                    onClick={handleConfirmOrder}
                    disabled={!confirmOrder}
                    className="bg-green-600 text-white hover:bg-green-700"
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
