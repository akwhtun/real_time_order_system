import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

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
          <Header />


          <div className="flex flex-grow w-full justify-end  p-4 ">
            {/* Main Content */}
            <main className="md:w-4/6   w-full main-bg2 rounded-lg shadow-md">
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
