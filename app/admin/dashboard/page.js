"use client";
import { useState, useEffect } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Table, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { fetchAllOrders } from "../libs/fetcher";
import { updateOrderStatus } from "../libs/fetcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {

    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [orderStatus, setOrderStatus] = useState("")
    const [error, setError] = useState(null)
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const [loading, setLoading] = useState(false)
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

            }
        } catch (error) {
            console.error("Error in updating order:", error);
            setError("Failed to update order.")
        } finally {
            setLoading(false)
        }
    };

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

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
            {updateSuccess && (
                <p className="text-green-500 text-sm mt-1">{updateSuccess}</p>
            )}
            {/* Filter by Status */}
            <div className="flex justify-between items-center gap-4">
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
                                <TableCell>{order.user.name}, {order.user.phone}</TableCell>
                                <TableCell>{order.waitingTime}, {order.totalFinalPrice}</TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
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
