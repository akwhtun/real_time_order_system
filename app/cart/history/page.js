import { fetchOrderHistory } from "@/app/libs/fetcher";
import Link from "next/link";
const OrderHistoryPage = async ({ searchParams }) => {

    let orderHistory = [];
    let error = null;
    const id = searchParams.id;
    console.log("user id is", id);

    try {
        const data = await fetchOrderHistory(id);

        if (data.error) {
            error = data.error;
        } else {
            orderHistory = data.history || [];
        }
    } catch (err) {
        console.error("Error in fetching order history:", err);
        error = "Failed to load order history.";
    }


    if (error) {
        return <div className="text-red-800 text-center mt-6">{res.error}</div>;
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

                            <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-600 mb-2">
                                    <strong>Waiting Time:</strong> {order.waitingTime} mins
                                </p>
                                <Link href={`/cart/view?orderCode=${order.orderCode}&totalPrice=${order.totalFinalPrice}&waitingTime=${order.waitingTime}`}
                                    className={`px-3 py-1 rounded-full text-sm 
                                       bg-violet-100 text-yellow-600"
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
