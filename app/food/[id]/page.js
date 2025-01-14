"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { foodItems } from "@/app/components/FoodItems";
import { useContext } from "react";
import { MyContext } from "@/app/AppProvider";
export default function Page({ params }) {
    const router = useRouter();
    const [itemCount, setItemCount] = useState(1);
    const [cartItems, setCartItems] = useState([])
    const { animate, setAnimate } = useContext(MyContext);

    const { id } = React.use(params);

    const food = foodItems.find((item) => item.id === parseInt(id));

    if (!food) {
        return <p>Food item not found!</p>;
    }

    const increaseCount = () => setItemCount((prev) => prev < 5 ? prev + 1 : prev);
    const decreaseCount = () => setItemCount((prev) => (prev > 1 ? prev - 1 : 1));

    const updateCartItems = () => {
        const localItem = JSON.parse(localStorage.getItem("food-in-cart")) || [];
        setCartItems(localItem);
    };

    useEffect(() => {
        updateCartItems();

        const handleStorageChange = () => {
            updateCartItems();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleCustomEvent = () => {
            updateCartItems();
        };

        window.addEventListener("cartUpdate", handleCustomEvent);

        return () => {
            window.removeEventListener("cartUpdate", handleCustomEvent);
        };
    }, []);


    const handleAddItem = (food) => {
        setAnimate(true);

        setTimeout(() => setAnimate(false), 500);
        const existingItem = cartItems.find(item => item.id === food.id);
        let updatedCart;
        if (existingItem) {
            updatedCart = cartItems.map(item => item.id === food.id ? { ...item, count: existingItem.count + 1 } : item)
        } else {
            updatedCart = [...cartItems, { ...food, count: itemCount }]
        }

        localStorage.setItem("food-in-cart", JSON.stringify(updatedCart))
        setCartItems(updatedCart)
        const event = new Event("cartUpdate");
        window.dispatchEvent(event);
    };

    return (
        <div className="container md:h-[530px] md:overflow-scroll mx-auto p-4">
            <div className="max-w-3xl mx-auto">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-64 object-cover rounded-lg"
                />
                <h1 className="mt-4 text-3xl font-bold">{food.name}</h1>
                <p className="mt-2 text-gray-700">{food.description}</p>
                <p className="mt-4 text-lg font-semibold main-text2">{food.price} MMK</p>
                <h2 className="mt-6 text-2xl font-bold">Ingredients</h2>
                <div className="flex items-center mt-6 space-x-4">
                    <button
                        onClick={decreaseCount}
                        className="main-bg2 main-text2 border-2 border-gray-700 px-4 py-2 rounded-lg "
                    >
                        -
                    </button>
                    <span className="text-lg font-bold">{itemCount}</span>
                    <button
                        onClick={increaseCount}
                        className="main-bg main-text px-4 py-2 rounded-lg "
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={() => handleAddItem(food)}
                    className="mt-6 cursor-pointer py-2 px-4 rounded-lg main-bg main-text"
                >
                    Add to Order
                </button>

                <button
                    onClick={() => router.push("/")}
                    className="mt-6 ml-4 cursor-pointer main-text2 main-bg2 border-2 border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Back to Menu
                </button>
            </div>
        </div >
    );
}
