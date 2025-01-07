import { useEffect, useState } from "react";

const OrderHistory = () => {
    const [user, setUser] = useState({});
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState("");

    // Fetch order history
    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const res = await fetch("/api/orders");
                if (res.ok) {
                    const data = await res.json();
                    setOrderHistory(data.orders); // Assuming the response has `orders` array
                } else {
                    const errorData = await res.json();
                    setError(errorData.error || "Failed to fetch order history.");
                }
            } catch (e) {
                setError("An error occurred while fetching the order history.");
            }
        };

        fetchOrderHistory();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-6">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-violet-600 mb-4 text-center">Order History</h1>
            {orderHistory.length === 0 ? (
                <p className="text-gray-500 text-center">You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orderHistory.map((order) => (
                        <div
                            key={order.orderCode}
                            className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-bold text-lg">Order #{order.orderCode}</h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${order.status === "completed"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-yellow-100 text-yellow-600"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-2">
                                <strong>Total Price:</strong> {order.totalFinalPrice} MMK
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>Waiting Time:</strong> {order.waitingTime} mins
                            </p>
                            <div className="text-sm text-gray-600">
                                <strong>Items:</strong>
                                <ul className="list-disc pl-5">
                                    {order.foodItems.map((item) => (
                                        <li key={item.id}>
                                            {item.quantity}x {item.name} - {item.totalPrice} MMK
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
