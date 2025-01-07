"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Hamburgermenu from "./Hamburgermenu";
import { useEffect, useState } from "react";

export default function Header() {
    const [items, setItems] = useState([]);

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
        <header className="main-bg main-text p-4 shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link href="/">
                    <p className="text-2xl font-bold">Food Order App</p>
                </Link>
                <div className="flex gap-4 mt-2">
                    <nav className="flex flex-wrap space-x-4 me-4 sm:mt-0">
                        <Button asChild>
                            <Link href="/cart">
                                <div className="relative inline-block">
                                    <FaShoppingCart className="text-2xl text-gray-700 hover:text-violet-600 cursor-pointer" />

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
