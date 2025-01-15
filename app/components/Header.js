"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Hamburgermenu from "./Hamburgermenu";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../AppProvider";
export default function Header() {
    const [items, setItems] = useState([]);

    const { animate, setAnimate } = useContext(MyContext)
    // Function to fetch items from localStorage
    const getItems = () => {
        const localItems = JSON.parse(localStorage.getItem("food-in-cart")) || [];
        setItems(localItems);
    };

    useEffect(() => {
        // Initial fetch
        getItems();

        // Listener for storage changes across tabs/windows
        const handleStorageChange = (event) => {
            if (event.key === "food-in-cart") {
                getItems();
            }
        };

        // Listener for custom updates in the same tab
        const handleCustomEvent = () => {
            getItems();
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("cartUpdate", handleCustomEvent);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("cartUpdate", handleCustomEvent);
        };
    }, []);

    return (
        <header className="main-bg main-text p-4  fixed top-0 left-0 w-full shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link href="/" className="cursor-pointer">
                    <p className="text-3xl  logo-font md:ms-12 ms-4 font-semibold">Foodify 2</p>
                </Link>
                <div className="flex gap-4 mt-2">
                    <nav className="flex flex-wrap space-x-4 me-4 sm:mt-0 ms-10">
                        <Button asChild>
                            <Link href="/cart">
                                <div
                                    className={`relative inline-block 
                                        ${animate ? "animate-popAndSpin" : ""}`}
                                >

                                    <FaShoppingCart className="text-2xl text-white  cursor-pointer" />

                                    {items.length > 0 ? (
                                        <span
                                            className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                                        >
                                            {items.length || ""}
                                        </span>
                                    ) : null}
                                </div>
                            </Link>
                        </Button>
                    </nav>
                    <Hamburgermenu />
                </div>
            </div>
        </header>
    );
}
