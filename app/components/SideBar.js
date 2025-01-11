import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SideBar({ isOpen }) {

    return (
        <aside
            className={`md:hidden block md:col-span-3 md:translate-x-0 main-bg p-4 rounded-lg shadow-md fixed md:w-2/6 w-3/5 h-full top-0 left-0 transform transition-transform duration-500 ease-in-out
              ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <Link href="/">
                <p className="text-2xl font-bold mb-3 mt-3 text-center">Food Order App</p>
            </Link>
            <nav className="space-y-4 flex flex-col mt-16">

                <Button asChild size="lg" className="text-lg">
                    <Link href={`/cart/history`}>Order History</Link>
                </Button>


                <Button asChild size="lg" className="text-lg">
                    <Link href="/settings">About</Link>
                </Button>

            </nav>
        </aside>
    );
}

