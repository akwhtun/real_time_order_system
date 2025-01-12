"use client"
import { useState, useEffect } from 'react'
import { fetchOrderControl } from '../admin/libs/fetcher'
import Cart from './Cart'
import OrderDisabled from './OrderDisabled'
export default function page() {
    const [isOrderOpen, setIsOrderOpen] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const localItem = JSON.parse(localStorage.getItem("food-in-cart")) || [];
        setCartItems(localItem)
    }, [])

    useEffect(() => {
        async function fetch() {
            try {
                setLoading(true)
                const data = await fetchOrderControl()

                if (data.error) {
                    setError(data.error)
                } else {
                    setIsOrderOpen(data.orderControl)
                }
            } catch (error) {
                console.error(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [])


    if (loading) {
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

        )
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-red-50">
                <p className="text-red-600 font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div>
            {isOrderOpen && isOrderOpen?.isOpen ? (
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
            ) : (
                <OrderDisabled />
            )}
        </div>
    );

}
