
export async function login(data) {
    if (data.name === "Our team" && data.username === "akwhtun" && data.password === "akwh@2002") {
        return true
    } else {
        return false
    }
}


export async function fetchAllOrders() {
    try {
        const res = await fetch("/api/admin", {
            method: "GET"
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.error || "Failed to fetch order");
        }

        return await res.json()
    } catch (error) {
        console.error("Error fetching order data:", error);
        return { error: error.message || "An unknown error occurred" };
    }
}


export async function updateOrderStatus(id, status) {
    try {
        const res = await fetch(`/api/admin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: status
            }
            )
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.error || "Failed to update order");

        }

        return await res.json()
    } catch (error) {
        console.error("Error updating order data:", error);
        return { error: error.message || "An unknown error occurred" };
    }
}


export async function fetchFoodOrder(orderCode) {

    try {
        const res = await fetch(`/api/orders/items/${orderCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        )
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.error || "Failed to fetch order food");

        }

        return await res.json()
    } catch (error) {
        console.error("Error fetching order data:", error);
        return { error: error.message || "An unknown error occurred" };
    }
}

export async function fetchOrderControl() {
    try {
        const res = await fetch("/api/orderControl", {
            method: "GET"
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.error || "Fail")
        }
        return await res.json()
    } catch (error) {
        console.error("Error fetching order data:", error);
        return { error: error.message || "An unknown error occurred" };
    }
}


export async function updateOrderControl(id, isOpen) {

    try {
        const res = await fetch(`/api/orderControl/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isOpen: isOpen
            }
            )
        })

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.error || "Fail")
        }
        return await res.json()
    } catch (error) {
        console.error("Error updating order data:", error);
        return { error: error.message || "An unknown error occurred" };
    }
}