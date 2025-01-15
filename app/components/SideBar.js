import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHistory, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
export default function SideBar({ isOpen, setIsOpen }) {

    return (
        <div className={`md:hidden flex transform transition-transform duration-500 ease-in-out z-30 w-full h-full fixed top-0 left-0  md:translate-x-0
              ${isOpen ? "translate-x-0" : " -translate-x-full"}`}>
            <aside
                className={` md:col-span-3 main-bg p-4 rounded-lg shadow-md  md:w-2/6 w-4/5 h-full  `}
            >
                <Link href="/" className="cursor-pointer flex justify-center mb-12">
                    <p className="md:text-3xl text-2xl mx-auto  logo-font md:ms-12 font-semibold">Foodify 2</p>
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
            <div
                className="w-1/5 bg-black opacity-65 h-full"
                onClick={() => setIsOpen(pre => !pre)}
            >
            </div>

        </div>
    );
}

