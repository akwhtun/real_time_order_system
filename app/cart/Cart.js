"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
export default function Cart({ cartItems, setCartItems }) {

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
        <div className="container md:h-[520px] md:overflow-scroll mx-auto md:p-4 p-1">
            <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center ">
                    <p className=" text-gray-700">Your cart is empty!</p>
                    <Link href={`/`}>
                        <button className="mt-4 w-48 text-white py-2 px-4 rounded-lg main-bg2 border-gray-700 border-2 main-text2 transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
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
                                <p className="text-gray-500">Price: {item.price} MMK</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="main-text2 main-bg2  px-2 py-1 rounded border-2 border-gray-700  transition"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-bold">{item.count}</span>
                                    <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="main-text main-bg  px-2 py-1 rounded  transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold">
                                    Total: {parseFloat(item.price) * parseInt(item.count)} MMK
                                </p>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="md:mt-2 mt-4 flex text-sm text-red-500 hover:underline"
                                >
                                    <FaTrash size={20} />
                                    &nbsp; Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center">
                        <Button onClick={clearCart} className="mt-4 main-text2 main-bg2 border-2 border-gray-700  py-2 px-4 rounded-lg ">
                            Clear Cart
                        </Button>
                        <Link href={`/`}>
                            <button className="mt-4 mx-4 w-48 py-2 px-4 rounded-lg main-bg main-text transition-colors">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg text-right">
                        <h2 className="text-xl font-bold mb-8">Total Cost: {totalCost} MMK</h2>
                        <Link href={"/cart/user"} className="mt-10 main-bg main-text py-2 px-4 rounded-lg ">
                            Proceed to Checkout
                        </Link>
                    </div>


                </div>
            )}
        </div>
    );
}
