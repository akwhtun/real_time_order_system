import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(req, { params }) {

    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        const orderHistory = await prisma.order.findMany({
            where: {
                userId: id,
            },
        });

        if (orderHistory.length > 0) {
            return NextResponse.json(
                { message: "Order history fetched successfully", history: orderHistory },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "No order history found for this user", history: [] },
                { status: 404 }
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