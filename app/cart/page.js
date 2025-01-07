"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const localItem = JSON.parse(localStorage.getItem("food-in-cart")) || [];
        setCartItems(localItem)
    }, [])

    let updatedCart;

    const increaseQuantity = (id) => {
        updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, count: item.count < 5 ? item.count + 1 : item.count } : item
        )

        setCartItems(updatedCart)
        localStorage.setItem("food-in-cart", JSON.stringify(updatedCart))

    };

    const decreaseQuantity = (id) => {

        updatedCart = cartItems.map((item) =>
            item.id === id && item.count > 1
                ? { ...item, count: item.count - 1 }
                : item
        )
            .filter((item) => item.count > 0) // Remove items with zero quantity
        setCartItems(updatedCart)
        localStorage.setItem("food-in-cart", JSON.stringify(updatedCart))

    };

    const removeItem = (id) => {
        updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart)
        localStorage.setItem("food-in-cart", JSON.stringify(updatedCart))

        const event = new Event("cartUpdate");
        window.dispatchEvent(event);
    };

    const totalCost = cartItems.reduce(
        (total, item) => total + item.price * item.count,
        0
    );

    const clearCart = () => {
        localStorage.removeItem("food-in-cart")
        setCartItems([])
        const event = new Event("cartUpdate");
        window.dispatchEvent(event);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-700">Your cart is empty!</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-white shadow-md rounded-lg p-4 space-x-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-grow">
                                <h2 className="text-lg font-bold">{item.name}</h2>
                                <p className="text-gray-500">Price: ${item.price}</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-bold">{item.count}</span>
                                    <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold">
                                    Total: ${parseFloat(item.price) * parseInt(item.count)}
                                </p>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="mt-2 text-sm text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="flex justify-between items-center">
                    <Button onClick={clearCart} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                        Clear Cart
                    </Button>
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg text-right">
                        <h2 className="text-xl font-bold">Total Cost: ${totalCost}</h2>
                        <Link href={"/cart/user"} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                            Proceed to Checkout
                        </Link>
                    </div>


                </div>
            )}
        </div>
    );
}
