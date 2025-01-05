import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, phone } = body;

        // Validate input
        if (!name || !phone) {
            return NextResponse.json(
                { error: "Name and phone are required." },
                { status: 400 }
            );
        }

        // Create a new user in MongoDB
        const newUser = await prisma.user.create({
            data: { name, phone },
        });

        // if (newUser) {
        //     localStorage.setItem("user", JSON.stringify(newUser));
        // }
        return NextResponse.json(
            { message: "User created successfully", user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
