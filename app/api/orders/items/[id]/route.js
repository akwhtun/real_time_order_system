import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function GET(req, { params }) {

    try {
        const { id } = params
        if (!id) {
            return NextResponse.json({ messge: "Order Code Id is required", status: 400 })
        }
        const orderItems = await prisma.foodItem.findMany({
            where: {
                orderCode: id
            },
        })

        if (orderItems.length > 0) {
            return NextResponse.json({ message: "Order Item fetched succcessfully", foods: orderItems }, { status: 200 })
        } else {
            return NextResponse.json({ message: "No Order Item found", foods: [], status: 404 })
        }
    } catch (error) {
        console.error("Error fetching order item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }


}