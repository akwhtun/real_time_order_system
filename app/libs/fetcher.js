const BASE_URL = "http://localhost:3000";

export async function postUserData({ name, phone }) {
    try {
        const res = await fetch(`/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                phone,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.error || "Failed to fetch order history");
        }
        return await res.json()

    } catch (e) {
        console.error("Error posting user data:", e);
        return { error: e.message || "An unknown error occurred" };
    }
}

export async function postOrderData(foodItems, userData) {


    try {
        const res = await fetch('/api/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ foodItems, userData })
        })
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to post order ");
        }
        return await res.json()

    } catch (e) {
        console.error("Error posting order data:", e);
        return { error: e.message || "An unknown error occurred" };
    }

}

export async function fetchOrderHistory(userId) {
    try {

        const res = await fetch(`${BASE_URL}/api/orders/history/${userId}`, {
            method: "GET",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to fetch order history");
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching order history:", error);
        return { error: error.message || "An unknown error occurred" };
    }
}

export async function fetchOrderItem(orderCode) {

    try {
        const res = await fetch(`${BASE_URL}/api/orders/items/${orderCode}`, {
            method: "GET"
        })
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.error || "Failed to fetch order history");
        }
        return await res.json()

    } catch (error) {
        console.error("Error fetching order history:", error);
        return { error: error.message || "An unknown error occurred" }
    }
}

