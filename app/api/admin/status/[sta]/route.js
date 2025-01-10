import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function GET(req, { params }) {

    try {
        const { sta } = params


        if (!sta) {
            return NextResponse.json(
                { message: "Status is required" },
                { status: 400 }
            );
        }

        const filterOrder = await prisma.order.findMany({
            where: {
                status: sta
            }
        })
        if (filterOrder.length > 0) {
            return NextResponse.json(
                { message: "filter order fetched successfully", filterOrder },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "filter order not found", filterOrder: [] },
                { status: 404 }
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