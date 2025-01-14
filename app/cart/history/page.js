"use client"
import { fetchOrderHistory } from "@/app/libs/fetcher";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
const OrderHistoryPage = () => {

    const [orderHistory, setOrderHistory] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [noAuthOrder, setNoAuthOrder] = useState(false)

    useEffect(() => {
        async function fetchHistory() {
            const user = JSON.parse(localStorage.getItem("user-data"))
            if (user) {
                try {
                    setLoading(true)
                    const data = await fetchOrderHistory(user.id);

                    if (data.error) {
                        setError(data.error);
                    } else {
                        setOrderHistory(data.history || []);
                    }
                } catch (err) {
                    console.error("Error in fetching order history:", err);
                    setError("Failed to load order history.");
                } finally {
                    setLoading(false)
                }
            } else {
                setNoAuthOrder(true)
            }
        }

        fetchHistory()
    }, [])



    if (noAuthOrder) {
        return <p className="text-gray-500 text-center">You have no orders yet.</p>
    }
    if (loading) {
        return (<div className="mt-4 flex h-full w-full items-center justify-center bg-gradient-to-r main-bg">
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

    if (error) {
        return <div className="text-red-800 text-center mt-6">{error}</div>;
    }

    return (

        <div className="md:h-[520px] md:overflow-scroll max-w-4xl mx-auto md:p-4 p-0">
            <Button asChild className="mx-auto md:mt-0 mt-3 flex justify-center">
                <Link href={"/"} className="main-bg main-text w-28 mx-auto">Back...</Link>
            </Button>
            <h1 className="text-2xl font-bold main-text2 mb-4 mt-3 text-center">Order History</h1>
            {orderHistory.length === 0 ? (
                <p className="text-gray-500 text-xl text-center">You have no orders yet.</p>
            ) : (
                <div className="space-y-6 main-text">
                    {orderHistory.map((order) => (
                        <div
                            key={order.orderCode}
                            className={`p-4 border border-gray-300 rounded-lg shadow hover:shadow-md transition  ${order.status === "completed"
                                ? "text-green-100 bg-green-400"
                                : order.status === "pending"
                                    ? "text-yellow-100 bg-yellow-400"
                                    : "text-red-100 bg-red-400"
                                }`}
                        >
                            <div className="flex text-white justify-between items-center mb-2">
                                <h2 className="font-bold text-lg">Order Code : {order.orderCode}</h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${order.status === "completed"
                                        ? "bg-green-100 text-green-600"
                                        : order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {order.status}
                                </span>

                            </div>
                            <p className="text-gray-600 mb-2">
                                <strong>Total Price:</strong> <strong>{order.totalFinalPrice} MMK</strong>
                            </p>

                            <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-600 mb-2">
                                    <strong>Waiting Time:</strong> <strong>{order.waitingTime} mins</strong>
                                </p>
                                <Link href={`/cart/view?orderCode=${order.orderCode}&totalPrice=${order.totalFinalPrice}&waitingTime=${order.waitingTime}`}
                                    className={`px-3 py-1 rounded-full text-sm 
                                    main-bg2 main-text2
                                    }`}
                                >
                                    Check Item
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;
