"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "../libs/fetcher";
export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(pre => ({ ...pre, [name]: value }))
    };

    console.log(formData);

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin-data"));
        if (admin) {
            router.push("/admin/dashboard")
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const isAdmin = await login(formData);

            if (isAdmin) {
                localStorage.setItem("admin-data", JSON.stringify(formData))
                router.push("/admin/dashboard")
            } else {
                setError("Invalid Credential")
            }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    };

    if (loading) {
        return (<div className="flex h-full w-full items-center justify-center bg-gradient-to-r main-bg">
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
        </div>)
    }


    return (
        <div className="flex flex-col h-full items-center justify-center bg-gradient-to-br main-bg2 main-text2">
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
                    <Button type="submit" className="w-full main-bg main-text">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
