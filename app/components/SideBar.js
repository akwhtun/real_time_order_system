import { Button } from "@/components/ui/button"; // Assuming you're using some custom button component
import Link from "next/link";

export default function SideBar({ isOpen }) {

    return (

        <aside
            className={`md:col-span-3 md:translate-x-0 main-bg p-4 rounded-lg shadow-md fixed md:w-2/6 w-3/5 h-full top-0 left-0 transform transition-transform duration-500 ease-in-out
              ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >

            <Link href="/">
                <p className="text-2xl font-bold mb-3 mt-3 text-center">Food Order App</p>
            </Link>
            <nav className="space-y-4 flex flex-col mt-10">
                <Button asChild size="lg" className="text-lg">
                    <Link href="/profile">Profile</Link>
                </Button>

                <Button asChild size="lg" className="text-lg">
                    <Link href="/settings">Settings</Link>
                </Button>
                <Button asChild size="lg" className="text-lg">
                    <Link href="/help">Help</Link>
                </Button>
            </nav>
        </aside>
    );
}
