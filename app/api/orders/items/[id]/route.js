import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export async function GET(req, { params }) {

    const { id } = params


    try {
        const orderItems = await prisma.foodItem.findMany({
            where: {
                orderCode: id
            },
        })

        if (orderItems) {
            return NextResponse.json({ message: "Order Item fetched succcessfully", foods: orderItems }, { status: 200 })
        }
    } catch (error) {
        console.error("Error fetching order item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }


}