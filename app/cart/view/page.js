import { fetchOrderItem } from "@/app/libs/fetcher";
import SaveImage from "./Image";
const OrderSummary = async ({ searchParams }) => {

    let orderCode = searchParams.orderCode
    let totalPrice = searchParams.totalPrice
    let waitingTime = searchParams.waitingTime
    let orderItems = []
    let error = null

    try {
        const data = await fetchOrderItem(orderCode);
        if (data.error) {
            error = data.error;

        } else {
            orderItems = data.foods

        }
    } catch (error) {
        console.error("Error in fetching order item:", err);
        error = "Failed to load order history.";
    }


    if (error) {
        return <div className="text-red-800 text-center mt-6">{error}</div>;
    }


    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <SaveImage orderItems={orderItems} waitingTime={waitingTime} totalPrice={totalPrice} />
        </div>
    );
};

export default OrderSummary
