import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

// let foodItems = [
//     { id: '1', name: 'burger', price: '2000', imageName: 'burger.jpg', count: 1, totalPrice: '2000' },
//     { id: '2', name: 'milk', price: '3000', imageName: 'milk.jpg', quantity: 2, totalPrice: '6000' },
//     { id: 1, name: 'sushi', price: '2000', imageName: 'sushi.jpg', quantity: 1, totalPrice: '2000' },
// ]

// { "id": '1', "name": "burger", "price": 2000, "imageName": "burger.jpg", "quantity": 1, "totalPrice": 2000 },
// { "id": '2', "name": "milk", "price": 3000, "imageName": "milk.jpg", "quantity": 2, "totalPrice": 2000 },


const prisma = new PrismaClient()

const order_code = process.env.ORDER_CODE

export async function POST(req) {
    const { foodItems, userData } = await req.json();
    const userId = userData.id;
    let data = [];
    let totalFinalPrice = 0;
    let orderCode = order_code + Math.floor(Math.random() * 1000000);
    let waitingTime = 0;
    let status = "pending";

    try {
        for (let cartItem of foodItems) {
            let price = parseInt(cartItem.price);
            let count = parseInt(cartItem.count);
            let totalPrice = price * count;

            data.push({
                orderCode,
                name: cartItem.name,
                price,
                imageName: cartItem.image,
                quantity: count,
                totalPrice,
            });

            totalFinalPrice += totalPrice;
            waitingTime += count * 5;
        }



        const itemCount = await prisma.foodItem.createMany({ data });
        const order = await prisma.order.create({
            data: {
                userId,
                orderCode,
                waitingTime,
                totalFinalPrice,
                status,
            },
        });




        if (itemCount && order) {
            return NextResponse.json(
                { message: "Order created successfully" },
                { status: 201 }
            );

        }
        // console.log(data);


    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );

    }
}







