"use client";
import { useState, useEffect } from "react";
import { fetchFoodOrder } from "../../libs/fetcher";
import Link from "next/link";
import { updateOrderStatus } from "../../libs/fetcher";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const UserOrdersPage = ({ params, searchParams }) => {
    const [paramsData, setParamsData] = useState({
        id: "",
        orderCode: "",
        userName: "",
        phone: "",
        totalFinalPrice: "",
        waitingTime: "",
        status: ""
    });
    const [userOrderData, setUserOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [foodError, setFoodError] = useState(null);
    const [status, setStatus] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null)
    useEffect(() => {
        const fetchParamsData = async () => {
            try {
                setIsLoading(true)
                // Unwrap params and searchParams
                const resolvedParams = await params;
                const resolvedSearchParams = await searchParams;

                // Update the state with unwrapped values
                setParamsData({
                    id: resolvedParams.id || "",
                    orderCode: resolvedSearchParams.orderCode || "",
                    userName: resolvedSearchParams.userName || "",
                    phone: resolvedSearchParams.phone || "",
                    totalFinalPrice: resolvedSearchParams.totalPrice || "",
                    waitingTime: resolvedSearchParams.waitingTime || "",
                    status: resolvedSearchParams.status || "",
                });
                setStatus(resolvedSearchParams.status || "")
            } catch (err) {
                console.error("Error resolving params or searchParams:", err);
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
                setIsLoading(true)
                if (paramsData.orderCode) {
                    const data = await fetchFoodOrder(paramsData.orderCode);
                    setIsLoading(true)
                    if (data.error) {

                        setFoodError(data.error);
                    } else {
                        setUserOrderData(data.foods);
                    }
                }
            } catch (err) {
                console.error("Error fetching order data:", err);
                setFoodError("Failed to fetch order data.");
            } finally {
                setIsLoading(false)
            }
        };

        fetchUserOrderData();
    }, [paramsData.orderCode]);


    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setIsLoading(true)
            const data = await updateOrderStatus(orderId, newStatus)
            if (data.error) {
                setError(data.error)
            } else {
                setUpdateSuccess(data.message)
                setStatus(data.updatedOrder.status)
            }
        } catch (error) {
            console.error("Error in updating order:", error);
            setError("Failed to update order.")
        } finally {
            setIsLoading(false)
        }
    };


    if (isLoading) {
        return (

            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r main-bg">
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

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (foodError) {
        return <p className="text-red-500">{foodError}</p>;
    }

    return (
        <div className="p-4">

            {updateSuccess && (
                <p className="text-green-500 text-sm mt-1">{updateSuccess}</p>
            )}

            {status ? (<Select
                onValueChange={(value) => handleStatusChange(paramsData.id, value)}
                defaultValue={status}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
            </Select>) : (<>....</>)}
            <h1 className="text-xl font-bold mb-4">User Orders</h1>
            <Link href="/admin/dashboard">Back</Link>
            <div className="mb-6">
                <h2 className="text-lg font-semibold">User Info</h2>
                <p><strong>Name:</strong> {paramsData.userName}</p>
                <p><strong>Phone:</strong> {paramsData.phone}</p>
            </div>

            <div>
                <h2 className="text-lg font-semibold">Orders</h2>
                {userOrderData.length > 0 ? (
                    <ul className="space-y-4">
                        <h3 className="font-bold">Order ID: {paramsData.orderCode}</h3>
                        <h3 className="font-bold">Status: {status}</h3>
                        <h3 className="font-bold">totalFinalPrice: {paramsData.totalFinalPrice}</h3>
                        {userOrderData.map((order) => (
                            <li key={order.id} className="p-4 border rounded bg-gray-100 flex items-center space-x-4">
                                {/* Order Item Image */}
                                <img
                                    src={order.imageUrl}
                                    alt={order.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                {/* Order Item Details */}
                                <div>
                                    <h4 className="font-semibold">{order.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        <strong>Price:</strong> ${order.price}
                                    </p>
                                    <p className="text-sm text-gray-600">
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
    );
};

export default UserOrdersPage;
