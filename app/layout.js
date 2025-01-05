import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import "./globals.css";

import Hamburgermenu from "./components/Hamburgermenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Food Order App",
  description: "Develop for to order food in university welcome day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="main-bg main-text p-4 shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
              <Link href="/">
                <p className="text-2xl font-bold">Food Order App</p>
              </Link>
              <div className="flex gap-4 mt-2">
                <nav className="flex flex-wrap space-x-4  me-4 sm:mt-0">
                  <Button asChild>
                    <Link href="/menu">
                      <div className="relative inline-block">
                        <FaShoppingCart className="text-2xl text-gray-700 hover:text-violet-600 cursor-pointer" />

                        <span
                          className=
                          "absolute -top-4 -right-4 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"

                        >
                          9
                        </span>
                      </div>
                    </Link>
                  </Button>
                </nav>
                <Hamburgermenu />
              </div>
            </div>

          </header>

          <div className="flex flex-grow w-full justify-end  p-4 ">
            {/* Main Content */}
            <main className="md:w-4/6   w-full main-bg2 rounded-lg shadow-md">
              {children}
            </main>

          </div>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-300 p-4">
            <div className="container mx-auto text-center">
              <p>
                &copy; {new Date().getFullYear()} Food Order App. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>

  );
}
