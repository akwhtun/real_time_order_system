"use client";
import { useState, useEffect } from "react";
import { fetchFoodOrder, updateOrderStatus } from "../../libs/fetcher";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const UserOrdersPage = ({ params, searchParams }) => {
    const [paramsData, setParamsData] = useState({
        id: "",
        orderCode: "",
        userName: "",
        phone: "",
        totalFinalPrice: "",
        waitingTime: "",
        status: "",
    });
    const [userOrderData, setUserOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [foodError, setFoodError] = useState(null);
    const [status, setStatus] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    useEffect(() => {
        const fetchParamsData = async () => {
            try {
                setIsLoading(true);
                const resolvedParams = await params;
                const resolvedSearchParams = await searchParams;

                setParamsData({
                    id: resolvedParams.id || "",
                    orderCode: resolvedSearchParams.orderCode || "",
                    userName: resolvedSearchParams.userName || "",
                    phone: resolvedSearchParams.phone || "",
                    totalFinalPrice: resolvedSearchParams.totalPrice || "",
                    waitingTime: resolvedSearchParams.waitingTime || "",
                    status: resolvedSearchParams.status || "",
                });
                setStatus(resolvedSearchParams.status || "");
            } catch (err) {
                setError("Failed to load search parameters.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchParamsData();
    }, [params, searchParams]);

    useEffect(() => {
        const fetchUserOrderData = async () => {
            try {
                setIsLoading(true);
                if (paramsData.orderCode) {
                    const data = await fetchFoodOrder(paramsData.orderCode);
                    if (data.error) {
                        setFoodError(data.error);
                    } else {
                        setUserOrderData(data.foods);
                    }
                }
            } catch (err) {
                setFoodError("Failed to fetch order data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserOrderData();
    }, [paramsData.orderCode]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setIsLoading(true);
            const data = await updateOrderStatus(orderId, newStatus);
            if (data.error) {
                setError(data.error);
            } else {
                setUpdateSuccess(data.message);
                setStatus(data.updatedOrder.status);
            }
        } catch {
            setError("Failed to update order.");
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
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

    if (error || foodError) {
        return (
            <div className="flex h-screen items-center justify-center bg-red-50">
                <p className="text-red-600 font-medium">{error || foodError}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">User Order Details</h1>
                    <Link
                        href="/admin/dashboard"
                        className="text-gray-600 hover:underline"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {updateSuccess && (
                    <p className="text-green-500 text-sm font-medium mb-4">
                        {updateSuccess}
                    </p>
                )}

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-700">
                            User Information
                        </h2>
                        {status && (
                            <Select
                                onValueChange={(value) => handleStatusChange(paramsData.id, value)}
                                defaultValue={status}
                            >
                                <SelectTrigger className="w-[150px] border-indigo-500">
                                    <SelectValue placeholder="Change Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <p>
                            <strong>Name:</strong> {paramsData.userName}
                        </p>
                        <p>
                            <strong>Phone:</strong> {paramsData.phone}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
                        {userOrderData.length > 0 ? (
                            <ul className="space-y-2">
                                <li className="font-semibold">
                                    Order ID: {paramsData.orderCode}
                                </li>
                                <li className="font-semibold">
                                    Total Price: {paramsData.totalFinalPrice} MMK
                                </li>
                                <li className="font-semibold">
                                    Waiting Time : {paramsData.waitingTime} mins
                                </li>
                                {userOrderData.map((order) => (
                                    <li
                                        key={order.id}
                                        className="flex items-center p-4 bg-gray-100 rounded shadow"
                                    >
                                        <img
                                            src={order.imageName}
                                            alt={order.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="ml-4">
                                            <h4 className="font-semibold">{order.name}</h4>
                                            <p>
                                                <strong>Price:</strong> {order.price} MMK
                                            </p>
                                            <p>
                                                <strong>Quantity:</strong> {order.quantity}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No orders found for this user.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrdersPage;

