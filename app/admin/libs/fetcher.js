
export async function login(data) {
    console.log("data", data);

    if (data.name === "Our team" && data.username === "akwhtun" && data.password === "akwh@2002") {
        return true
    } else {
        return false
    }
}