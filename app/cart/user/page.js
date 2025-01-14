"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postUserData } from "@/app/libs/fetcher";

const UserInfo = () => {
    const [userData, setUserData] = useState({ name: "", phone: "" });
    const [error, setError] = useState({});
    const [addError, setAddError] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        try {
            // setLoading(true)
            const user = JSON.parse(localStorage.getItem("user-data"));
            const foodItems = JSON.parse(localStorage.getItem("food-in-cart"))
            if (!foodItems) {
                router.push("/")
            }
            if (user) {
                router.push("/cart/order")
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!userData.name.trim()) {
            errors.name = "Name is required.";
            isValid = false;
        }

        const phoneRegex = /^09[842769]\d{8}$/;

        if (!userData.phone.trim()) {
            errors.phone = "Phone number is required.";
            isValid = false;
        } else if (!phoneRegex.test(userData.phone)) {
            errors.phone = "Invalid phone number.";
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validate = validateForm();
        if (validate) {
            try {
                setLoading(true)
                const data = await postUserData(userData);
                if (data.error) {
                    setAddError(data.error);
                } else {
                    localStorage.setItem("user-data", JSON.stringify(data.user));
                    router.push("/cart/order")
                }
            } catch (error) {
                setAddError(error.message || "An unknown error occurred.");
            } finally {
                setLoading(false)
            }
        }


    };

    if (loading) {
        return (
            <div className="mt-4 flex h-full w-full items-center justify-center bg-gradient-to-r main-bg">
                <div className="flex flex-col items-center space-y-6">
                    {/* SVG Loader */}
                    <svg
                        className="h-16 w-16 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="white"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="white"
                            d="M12 2a10 10 0 0110 10H12z"
                        />
                    </svg>
                    {/* Text */}
                    <h1 className="text-2xl font-semibold text-white animate-pulse">
                        Loading, please wait...
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {addError && (
                <p className="text-red-500 text-sm mt-1">{addError}</p>
            )}
            <h1 className="text-3xl font-bold text-center mb-8">Your Information</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
            >
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        value={userData.name}
                        onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                        }
                        placeholder="Enter your name"
                    />
                    {error.name && (
                        <p className="text-red-500 text-sm mt-1">{error.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                        Phone
                    </label>
                    <Input
                        id="phone"
                        type="text"
                        value={userData.phone}
                        onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                        }
                        placeholder="09XXXXXXXXX "
                    />
                    {error.phone && (
                        <p className="text-red-500 text-sm mt-1">{error.phone}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full  text-white py-2 px-4 rounded-lg main-bg main-text"
                >
                    Proceed to Order
                </Button>
            </form>
        </div>
    );
};

export default UserInfo;
