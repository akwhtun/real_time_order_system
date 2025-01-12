"use client";

import { useState, useEffect } from "react";
import { fetchOrderItem } from "@/app/libs/fetcher";
import SaveImage from "./Image";
import { useSearchParams } from "next/navigation";
const OrderSummary = () => {
    const searchParams = useSearchParams();
    const [paramsData, setParamsData] = useState({
        orderCode: "",
        totalPrice: "",
        waitingTime: "",
    });
    const [orderItems, setOrderItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParamsData = () => {
            try {
                const orderCode = searchParams.get("orderCode") || "";
                const totalPrice = searchParams.get("totalPrice") || "";
                const waitingTime = searchParams.get("waitingTime") || "";

                setParamsData({ orderCode, totalPrice, waitingTime });
            } catch (err) {
                setError("Failed to load search parameters.");
            }
        };

        fetchParamsData();
    }, [searchParams]);

    useEffect(() => {
        async function fetchItem() {
            if (!paramsData.orderCode) return;

            try {
                setIsLoading(true);
                const data = await fetchOrderItem(paramsData.orderCode);

                if (data.error) {
                    setError(data.error);
                } else {
                    setOrderItems(data.foods || []);
                }
            } catch (error) {
                console.error("Error fetching order items:", error);
                setError("Failed to fetch order items.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchItem();
    }, [paramsData.orderCode]); // Dependency ensures this runs only when `orderCode` changes

    if (error) {
        return <div className="text-red-800 text-center mt-6">{error}</div>;
    }

    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r main-bg">
                <div className="flex flex-col items-center space-y-6">
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
                    <h1 className="text-2xl font-semibold text-white animate-pulse">
                        Loading, please wait...
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[520px] overflow-scroll flex flex-col items-center bg-gray-100 md:px-0 px-2">
            {orderItems.length > 0 && (
                <SaveImage
                    orderItems={orderItems}
                    waitingTime={paramsData.waitingTime}
                    totalPrice={paramsData.totalPrice}
                />
            )}
        </div>
    );
};

export default OrderSummary;
