import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function PUT(req, { params }) {
    const { id } = params;
    const { isOpen } = await req.json()

    try {
        if (!id) {
            return NextResponse.json(
                { error: "Control ID is required" },
                { status: 400 }
            );
        }


        const control = await prisma.orderControl.update({
            where: { id: id },
            data: { isOpen: isOpen },
        });

        if (control) {
            return NextResponse.json(
                { message: "Order Contorlled updated successfully", orderControl: control },
                { status: 201 }
            );
        }
    } catch (error) {
        console.error("Error updating control:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function PUT(req, { params }) {
//     try {
//         const { controlId } = params; // Ensure `controlId` is passed correctly in the URL
//         const { now } = await req.json(); // Ensure the `now` value is sent in the request body

//         if (!controlId) {
//             return NextResponse.json(
//                 { error: "Control ID is required" },
//                 { status: 400 }
//             );
//         }

//         const control = await prisma.orderControl.update({
//             where: { id: controlId },
//             data: { isOpen: now },
//         });

//         return NextResponse.json(
//             { message: "Order control updated successfully", orderControl: control },
//             { status: 200 } // Changed to 200 for update
//         );
//     } catch (error) {
//         console.error("Error updating control:", error);

//         if (error.code === "P2025") {
//             // Handle the case where no record is found
//             return NextResponse.json(
//                 { error: "Order control not found" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }
