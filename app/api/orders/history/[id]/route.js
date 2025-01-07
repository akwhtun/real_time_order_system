import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req, { params }) {

    const { id } = params
    try {
        const orderHistory = await prisma.order.findMany({
            where: {
                userId: id
            },
        })
        if (orderHistory) {
            return NextResponse.json(
                { message: "Order History fetched successfully", history: orderHistory },
                { status: 200 }
            );

        }


    } catch (error) {
        console.error("Error fetching order history:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );

    }

}