"use client";

import { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Table, TableRow, TableCell, TableHeader } from "@/components/ui/table";

export default function AdminDashboard() {
    // Hardcoded orders
    const orders = [
        {
            id: "1",
            user: { name: "John Doe" },
            items: [{ name: "Burger" }, { name: "Fries" }],
            status: "pending",
        },
        {
            id: "2",
            user: { name: "Jane Smith" },
            items: [{ name: "Pizza" }, { name: "Soda" }],
            status: "processing",
        },
        {
            id: "3",
            user: { name: "Bob Brown" },
            items: [{ name: "Salad" }],
            status: "completed",
        },
    ];

    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [filterStatus, setFilterStatus] = useState("all");

    // Handle filtering orders by status
    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (status === "all") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.status === status));
        }
    };

    // Handle changing order status
    const handleStatusChange = (orderId, newStatus) => {
        setFilteredOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {/* Filter by Status */}
            <div className="flex items-center gap-4">
                <Select onValueChange={handleFilterChange} defaultValue="all">
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Orders Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>
                                {order.items.map((item) => item.name).join(", ")}
                            </TableCell>
                            <TableCell>{order.status}</TableCell>
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
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
