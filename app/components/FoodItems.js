"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../AppProvider";
export const foodItems = [
    {
        id: 1,
        name: "စပိုက်ဆီ ခေါက်ဆွဲ",
        description: "စပိုက်ဆီ ခေါက်ဆွဲသား + စပိုက်ဆီ အနှစ်ဘူး + ခါကြက်ဥ + မုန်ညင်းရွက် နှစ်မျိုး",
        price: "3000",
        image: "/image/spicy-noodle.jpg",
    },
    {
        id: 2,
        name: "ဒိန်ချဥ် စစ်စစ်",
        description: "ဒိန်ချဥ် + ရေခဲ",
        price: "2500",
        image: "/image/yogurt.jpg",
    },
    {
        id: 3,
        name: "စတော်ဘယ်ရီ ဒိန်ချဥ်",
        description: " စတော်ဘယ်ရီ + ဒိန်ချဥ်စစ်စစ် + နို့ဆီ/နို့စိမ်း + ရေခဲ",
        price: "3500",
        image: "/image/Strawberry-Yogurt.webp",
    },
    {
        id: 4,
        name: "အိုဗာကွေး",
        description: "အီကြာကွေး + နွားနို့စစ်စစ် + အိုဗာတင်း (အဖြူ + အနီ)",
        price: "1500",
        image: "/image/over-kway.jpg",
    },
];


const FoodItems = () => {
    const [cartItems, setCartItems] = useState([])

    const { animate, setAnimate } = useContext(MyContext);

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
            updatedCart = [...cartItems, { ...food, count: 1 }]
        }

        localStorage.setItem("food-in-cart", JSON.stringify(updatedCart))
        setCartItems(updatedCart)
        const event = new Event("cartUpdate");
        window.dispatchEvent(event);
    };


    return (
        <div className="container mx-auto md:p-6 p-3 ">
            <h1 className="text-3xl font-bold text-center mb-8 main-text2">Our Delicious Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 menu-font">
                {foodItems.map((item) => (
                    <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded-t-md"
                        />
                        <CardContent className="p-4">
                            <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                            <CardDescription className="text-sm text-gray-600 my-2">
                                {item.description.slice(0, 40)}...
                            </CardDescription>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-lg font-bold">{item.price} MMK</span>
                                <Button className="pb-0" onClick={() => handleAddItem(item)}>Add to Cart</Button>
                            </div>
                            <Link href={`/food/${item.id}`}>
                                <button className="mt-4 w-full text-white pt-2 px-4 rounded-lg main-bg2 border-gray-700 border-2 main-text2 transition-colors">
                                    More Details
                                </button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FoodItems;
