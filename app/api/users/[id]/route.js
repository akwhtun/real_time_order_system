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

        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
        });

        if (user) {
            return NextResponse.json(
                { message: "User exit", user: user },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "No user exit", user: null },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }

}