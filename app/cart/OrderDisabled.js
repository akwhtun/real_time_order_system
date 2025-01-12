import Link from "next/link";

export default function OrderDisabled() {
    return (
        <div className="h-[500px] main-bg2  main-text2 flex flex-col items-center justify-start text-center">
            <h1 className="text-4xl font-bold mt-20 mb-4">Orders are Disabled</h1>
            <p className="text-lg text-gray-700 mb-6">
                We have temporarily disabled order placement due to a high volume of orders.
                Please check back soon. Thank you for your understanding!
            </p>
            <Link href="/">
                <p className="px-6 py-3 main-bg main-text text-white rounded-lg transition">
                    Return to Homepage
                </p>
            </Link>
        </div>
    );
}
