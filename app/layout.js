import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['100', '400', '900'], // Use exact weights you need
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ['100', '400', '900'], // Use exact weights you need
  display: 'swap',
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
          <Header />
          <div className=" flex-grow w-full justify-end mx-auto p-4 grid  grid-cols-12 gap-4">
            {/* Sidebar */}
            <aside className="md:block hidden col-span-3 bg-gray-100 p-4 rounded-lg shadow-md">
              <nav className="space-y-4 flex flex-col  items-center mt-7">
                <Button asChild size="lg" className="text-lg w-full main-bg main-text">
                  <Link href={`/cart/history`}>Order History</Link>
                </Button>


                <Button asChild size="lg" className="text-lg w-full main-bg main-text">
                  <Link href="/about">About</Link>
                </Button>
                <Button asChild size="lg" className="text-lg w-full main-bg main-text">
                  <Link href="/help">Help</Link>
                </Button>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-9 col-span-12 w-full bg-white p-4 rounded-lg shadow-md">
              {children}
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>

  );
}
