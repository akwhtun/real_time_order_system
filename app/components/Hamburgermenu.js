"use client";
import { useState } from "react";
import SideBar from "./SideBar";

export default function Hamburgermenu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <SideBar isOpen={isOpen} />
            <button
                className="relative flex flex-col items-center justify-center w-10 h-10 space-y-1.5 md:hidden"
                onClick={() => setIsOpen(!isOpen)} // Toggle isOpen on button click
                aria-label="Toggle Menu"
            >
                {/* Menu bars with transitions */}
                <span
                    className={`h-1 w-8 bg-white rounded-full transform transition duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
                />
                <span
                    className={`h-1 w-8 bg-white rounded-full transition duration-300 ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                    className={`h-1 w-8 bg-white rounded-full transform transition duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                />
            </button>

        </>

    );
}
