"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FoodItems = () => {
    const foodItems = [
        {
            id: 1,
            name: "Margherita Pizza",
            description: "Classic cheese pizza with a crispy crust and tomato sauce.",
            price: "$9.99",
            image: "https://via.placeholder.com/300x200?text=Pizza",
        },
        {
            id: 2,
            name: "Caesar Salad",
            description: "Fresh lettuce, Parmesan cheese, croutons, and Caesar dressing.",
            price: "$7.49",
            image: "https://via.placeholder.com/300x200?text=Salad",
        },
        {
            id: 3,
            name: "Spaghetti Bolognese",
            description: "Italian pasta served with a rich meat sauce.",
            price: "$12.99",
            image: "https://via.placeholder.com/300x200?text=Pasta",
        },
        {
            id: 4,
            name: "Chocolate Cake",
            description: "Decadent chocolate cake topped with creamy chocolate frosting.",
            price: "$5.99",
            image: "https://via.placeholder.com/300x200?text=Cake",
        },
    ];

    return (
        <div className="container mx-auto p-6 ">
            <h1 className="text-3xl font-bold text-center mb-8">Our Delicious Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
                {foodItems.map((item) => (
                    <Card key={item.id} className="shadow-md hover:shadow-lg transition-shadow">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded-t-md"
                        />
                        <CardContent className="p-4">
                            <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
                            <CardDescription className="text-sm text-gray-600 mb-2">
                                {item.description}
                            </CardDescription>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-lg font-bold text-green-600">{item.price}</span>
                                <Button>Add to Cart</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FoodItems;
