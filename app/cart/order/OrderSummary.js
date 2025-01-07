"use client";

const OrderSummary = ({ cartItems, totalCost }) => {
    return (
        <div className="bg-white p-4 border rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Your Order</h3>
            <div className="mt-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between mb-3">
                        <div className="text-lg">{item.name} x {item.count}</div>
                        <div className="text-lg font-semibold">${(parseFloat(item.price) * item.count)}</div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-xl font-semibold">
                <p><strong>Total Cost: </strong>${totalCost}</p>
            </div>
        </div>
    );
};

export default OrderSummary;
