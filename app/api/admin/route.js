import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function GET() {
    try {
        const ordersWithUser = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: true
            }
        })


        if (ordersWithUser.length > 0) {
            return NextResponse.json({
                message: "fetched orders with user", orderData: ordersWithUser
            }, {
                status: 200
            })
        } else {
            return NextResponse.json({
                message: "No order data found", orderData: []
            }, { status: 404 }
            )
        }
    } catch (error) {
        console.error("Error fetching order data:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

