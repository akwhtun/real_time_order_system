import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function GET(req, { params }) {
    try {
        const { orderCode } = params

        if (!orderCode) {
            return NextResponse.json({ message: "Order Code required" }, { status: 404 })
        }

        const orderItems = await prisma.foodItem.findMany({
            where: {
                orderCode: orderCode
            }
        })


        if (orderItems && orderItems.length > 0) {

            return NextResponse.json({ message: "Order Item fetched successfully", foods: orderItems }, { status: 200 })
        } else {
            return NextResponse.json({ message: "Order Item not found" }, { foods: [] }, { status: 404 })
        }
    } catch (error) {
        console.error("Error fetching order data:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function PUT(req, { params }) {
    try {
        const { orderCode } = params
        const id = orderCode;
        const { status } = await req.json()

        if (!id) {
            return NextResponse.json(
                { message: "Id is required" },
                { status: 400 }
            );
        }

        if (!status) {
            return NextResponse.json(
                { message: "Status is required" },
                { status: 400 }
            );
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id
            },
            data: {
                status
            }
        })

        if (updatedOrder) {
            return NextResponse.json(
                { message: "Order status updated", updatedOrder },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error fetching order data:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function DELETE(req, { params }) {
    try {
        const { orderCode } = params;
        if (!orderCode) {
            return NextResponse.json(
                { message: "OrderCode is required" },
                { status: 400 }
            );
        }

        const deletedOrder = await prisma.order.delete({
            where: {
                orderCode: orderCode,
            },
        });
        const deletedFoods = await prisma.foodItem.deleteMany({
            where: {
                orderCode: orderCode,
            },
        });

        if (deletedOrder && deletedFoods) {
            return NextResponse.json(
                { message: 'Orders and foods deleted successfully', },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error deleting order data:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}