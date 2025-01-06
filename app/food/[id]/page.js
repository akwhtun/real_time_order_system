"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const foodItems = [
    { id: 1, name: "Pizza", description: "Delicious cheese pizza with fresh ingredients.", price: "$10", image: "/images/pizza.jpg", ingredients: ["Cheese", "Tomato Sauce", "Dough"] },
    { id: 2, name: "Burger", description: "Juicy beef burger with crispy lettuce and tangy sauce.", price: "$8", image: "/images/burger.jpg", ingredients: ["Beef Patty", "Lettuce", "Bun"] },
    { id: 3, name: "Sushi", description: "Fresh sushi platter with assorted seafood.", price: "$15", image: "/images/sushi.jpg", ingredients: ["Rice", "Fish", "Seaweed"] },
];

export default function Page({ params }) {
    const router = useRouter();
    const [itemCount, setItemCount] = useState(1);

    // Unwrap params using React.use() if needed
    const { id } = React.use(params);

    const food = foodItems.find((item) => item.id === parseInt(id));

    if (!food) {
        return <p>Food item not found!</p>;
    }

    const increaseCount = () => setItemCount((prev) => prev + 1);
    const decreaseCount = () => setItemCount((prev) => (prev > 1 ? prev - 1 : 1));
    const handleOrder = () => {
        alert(`You ordered ${itemCount} ${food.name}(s).`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-3xl mx-auto">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-64 object-cover rounded-lg"
                />
                <h1 className="mt-4 text-3xl font-bold">{food.name}</h1>
                <p className="mt-2 text-gray-700">{food.description}</p>
                <p className="mt-4 text-lg font-semibold text-green-600">{food.price}</p>
                <h2 className="mt-6 text-2xl font-bold">Ingredients</h2>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                    {food.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>

                <div className="flex items-center mt-6 space-x-4">
                    <button
                        onClick={decreaseCount}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        -
                    </button>
                    <span className="text-lg font-bold">{itemCount}</span>
                    <button
                        onClick={increaseCount}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleOrder}
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Add to Order
                </button>

                <button
                    onClick={() => router.push("/foods")}
                    className="mt-6 ml-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    );
}
