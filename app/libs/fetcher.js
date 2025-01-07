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

        return res;
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
        return res;
    } catch (e) {
        console.error("Error posting order data:", e);
        return { error: e.message || "An unknown error occurred" };
    }


}
