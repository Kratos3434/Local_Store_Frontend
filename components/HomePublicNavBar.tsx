'use client'

import Link from "next/link";

const HomePublicNavBar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full h-[60px] flex justify-between bg-indigo-500 px-4 items-center">
            <div>
                <Link href="/" className="text-white font-bold text-2xl">
                    Local Store
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <Link href="/signin" className="text-white font-bold">
                    Sign in
                </Link>
                <Link href="/signup" className="rounded-full bg-black text-white font-bold py-2 px-5">
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default HomePublicNavBar;