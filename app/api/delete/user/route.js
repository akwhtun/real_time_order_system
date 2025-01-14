import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req) {
    try {
        // Perform deletion
        const result = await prisma.user.deleteMany({
            where: {}
        });



        return NextResponse.json(
            {
                message: "all user records deleted",
                count: result.count,
            },
            { status: 200 }
        );

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting user records:", error);

        // Return error response
        return NextResponse.json(
            {
                error: "Server error occurred while deleting user records",
            },
            { status: 500 }
        );
    }
}