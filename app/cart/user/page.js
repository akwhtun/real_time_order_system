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
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user-data"));
        if (user) {
            router.push("/cart/order")
        }
    }, [])

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!userData.name.trim()) {
            errors.name = "Name is required.";
            isValid = false;
        }

        const phoneRegex = /^[0-9]{10,15}$/; // Validates phone numbers with 10-15 digits
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
                const res = await postUserData(userData);
                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem("user-data", JSON.stringify(data.user));
                } else {
                    const errorData = await res.json();
                    setAddError(errorData.error || "Failed to add user.");
                }
            } catch (error) {
                setAddError(error.message || "An unknown error occurred.");
            }
        }


    };

    return (
        <div className="container mx-auto p-6">
            {addError && (
                <p className="text-red-500 text-sm mt-1">{addError}</p>
            )}
            <h1 className="text-3xl font-bold text-center mb-8">User Information</h1>
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
                        placeholder="Enter your phone number"
                    />
                    {error.phone && (
                        <p className="text-red-500 text-sm mt-1">{error.phone}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors"
                >
                    Proceed to Menu
                </Button>
            </form>
        </div>
    );
};

export default UserInfo;
