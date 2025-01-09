"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../libs/fetcher";
export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState(null)

    const router = useRouter()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(pre => ({ ...pre, [name]: value }))
    };

    console.log(formData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isAdmin = await login(formData);

        if (isAdmin) {
            localStorage.setItem("admin-data", JSON.stringify(formData))
            router.push("/admin/dashboard")
        } else {
            setError("Invalid Credential")
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-500">
            {error && (
                <p className="text-red-500 text-lg mb-2">{error}</p>
            )}
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-700">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-violet-500 hover:bg-violet-600">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
