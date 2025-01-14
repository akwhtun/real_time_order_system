import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
    try {
        // Perform deletion
        const result = await prisma.order.deleteMany({
            where: {}
        });



        return NextResponse.json(
            {
                message: "all order records deleted",
                count: result.count,
            },
            { status: 200 }
        );

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting order records:", error);

        // Return error response
        return NextResponse.json(
            {
                error: "Server error occurred while deleting order records",
            },
            { status: 500 }
        );
    }
}