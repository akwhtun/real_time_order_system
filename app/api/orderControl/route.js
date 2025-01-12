import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function POST(req) {
    const { isOpen } = await req.json()
    try {


        const contorl = await prisma.orderControl.create({
            data: { isOpen },
        });

        if (contorl) {
            return NextResponse.json(
                { message: "Order Contorlled successfully", orderControl: contorl },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error("Error creating control:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req) {

    try {
        const contorl = await prisma.orderControl.findFirst({

        });

        if (contorl) {
            return NextResponse.json(
                { message: "Order fetched successfully", orderControl: contorl },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error("Error fetching control:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

