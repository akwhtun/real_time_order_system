import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 md:p-4 p-3">
            <div className="container mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} Foodify 2. All rights
                    reserved.
                </p>
            </div>
        </footer>
    )
}
