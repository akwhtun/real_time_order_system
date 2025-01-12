import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHistory, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
export default function SideBar({ isOpen }) {

    return (
        <aside
            className={`md:hidden block md:col-span-3 md:translate-x-0 main-bg p-4 rounded-lg shadow-md fixed md:w-2/6 w-3/5 h-full top-0 left-0 transform transition-transform duration-500 ease-in-out
              ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <Link href="/">
                <p className="text-2xl font-bold mb-3 mt-3 text-center">Food Order App</p>
            </Link>
            <nav className="space-y-4 flex flex-col items-center mt-7">
                <Button asChild size="lg" className="text-lg w-full flex  items-center gap-3 bg-black main-text">
                    <Link href="/cart/history">
                        <>
                            <FaHistory size={20} />
                            Order History
                        </>
                    </Link>
                </Button>

                <Button asChild size="lg" className="text-lg w-full flex items-center gap-3 bg-black main-text">
                    <Link href="/about">
                        <>
                            <FaInfoCircle size={20} />
                            About
                        </>
                    </Link>
                </Button>

                <Button asChild size="lg" className="text-lg w-full flex items-center gap-3 bg-black main-text">
                    <Link href="/help">
                        <>
                            <FaQuestionCircle size={20} />
                            Help
                        </>
                    </Link>
                </Button>
            </nav>
        </aside>
    );
}

