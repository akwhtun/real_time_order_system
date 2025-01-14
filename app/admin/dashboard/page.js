"use client";
import { useState, useEffect } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { fetchOrderControl } from "../libs/fetcher";
import { Input } from "@/components/ui/input";
import { Table, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { fetchAllOrders } from "../libs/fetcher";
import { updateOrderStatus } from "../libs/fetcher";
import { updateOrderControl } from "../libs/fetcher";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {

    const router = useRouter()

    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [orderStatus, setOrderStatus] = useState("")
    const [error, setError] = useState(null)
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isOrderOpen, setIsOrderOpen] = useState(null)

    useEffect(() => {

        const admin = JSON.parse(localStorage.getItem("admin-data"))
        if (!admin) {
            router.push("/admin/login")
        }
        async function fetchControl() {
            try {
                const data = await fetchOrderControl()
                if (data.error) {
                    setError(data.error);
                } else {
                    setIsOrderOpen(data.orderControl)
                }
            } catch (err) {
                console.error("Error in fetching order:", err);
                setError("Failed to load order.")
            }
        }
        fetchControl()
    }, [])

    useEffect(() => {
        async function fetchOrder() {
            setLoading(true)
            try {
                const data = await fetchAllOrders();
                if (data.error) {
                    setError(data.error);
                } else {
                    setOrders(data.orderData)
                    setFilteredOrders(data.orderData)
                }
            } catch (err) {
                console.error("Error in fetching order:", err);
                setError("Failed to load order.")
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [orderStatus])


    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (status === "all") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.status === status));
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setLoading(true)
            const data = await updateOrderStatus(orderId, newStatus)
            if (data.error) {
                setError(data.error)
            } else {
                setOrderStatus(newStatus)
                setUpdateSuccess(data.message)
                setFilterStatus("all")
                setSearchQuery("")
            }
        } catch (error) {
            console.error("Error in updating order:", error);
            setError("Failed to update order.")
        } finally {
            setLoading(false)
        }
    };


    const handleSearch = (e) => {
        setFilterStatus("all");
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredOrders(
            orders.filter((order) =>
                order.user.name.toLowerCase().includes(query)
            )
        );
    };

    const handleOrderControl = async () => {
        try {
            setLoading(true)
            const data = await updateOrderControl(isOrderOpen.id, !isOrderOpen.isOpen)
            if (data.error) {
                setError(data.error)
            } else {
                setIsOrderOpen(data.orderControl)
            }
        } catch (error) {
            console.error("Error in updating order:", error);
            setError("Failed to update order.")
        } finally {
            setLoading(false)
        }
    }


    const handleLogout = () => {

        localStorage.removeItem("admin-data");

        router.push("/admin/login");
    };


    if (loading) {
        return (
            <div className="mt-4 flex h-full w-full items-center justify-center bg-gradient-to-r main-bg">
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

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center ">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                <button
                    onClick={handleLogout}
                    className="main-bg text-white px-4 py-2 rounded  focus:outline-none focus:ring-2 "
                >
                    Logout
                </button>
                {isOrderOpen ? (<button
                    className={`px-4 py-2 text-white font-medium rounded-md ${isOrderOpen.isOpen ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                        }`}
                    onClick={handleOrderControl}
                >
                    {isOrderOpen.isOpen ? "Turn Orders Off" : "Turn Orders On"}
                </button>) : (<></>)}

            </div>

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            {updateSuccess && (
                <Alert className="bg-black text-white">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                        {updateSuccess}
                    </AlertDescription>
                </Alert>
            )}

            {/* Filter by Status */}
            <div className="flex flex-wrap justify-between items-center gap-4 mt-2">
                <Select onValueChange={(value) => handleFilterChange(value)} value={filterStatus}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
                {/* Search Bar */}
                <Input
                    type="text"
                    placeholder="Search order by name"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e)}
                    className="w-full max-w-md"
                />
                <p>Total Order :{filteredOrders.length}</p>
            </div>

            {/* Orders Table */}
            {filteredOrders.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>User Data</TableCell>
                            <TableCell>Order Data</TableCell>
                            <TableCell>Orderdate Date</TableCell>

                            <TableCell>Check Item</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.orderCode}</TableCell>
                                <TableCell className="text-base">{order.user.name},<br /> {order.user.phone}</TableCell>
                                <TableCell> {order.totalFinalPrice}MMK <br /> {order.waitingTime} mins</TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleTimeString('en-US', { hour12: true })}
                                </TableCell>
                                <TableCell>
                                    <Button asChild>
                                        <Link href={`/admin/checkItem/${order.id}?orderCode=${order.orderCode}&userName=${order.user.name}&phone=${order.user.phone}&waitingTime=${order.waitingTime}&totalPrice=${order.totalFinalPrice}&status=${order.status}`}>Check Food</Link>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        onValueChange={(value) => handleStatusChange(order.id, value)}
                                        defaultValue={order.status}
                                    >
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Change Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="mt-4 text-lg">No order exist</p>
            )}
        </div>
    );
}
