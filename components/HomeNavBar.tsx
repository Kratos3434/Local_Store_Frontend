'use client'

import { UserDTO } from "@/data";
import { userAtom } from "@/store";
import { AccountCircle, ArrowDropDown, Logout } from "@mui/icons-material";
import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomeNavBar = ({ user }: { user: UserDTO }) => {
    useHydrateAtoms([[userAtom, user]], { dangerouslyForceHydrate: true });

    const [openDropdown, setOpenDropdown] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/local_api/cookies/session', { method: 'DELETE' });
        router.replace("/signin");
    }

    return (
        <nav className="fixed top-0 left-0 w-full h-[60px] flex justify-between bg-indigo-500 px-4 items-center">
            <div>
                <Link href="/" className="text-white font-bold text-2xl">
                    Local Store
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <div className="rounded-full bg-black text-white font-bold py-2 px-5 cursor-pointer relative" onClick={() => setOpenDropdown(!openDropdown)}>
                    <p>
                        Hi, {user.firstName} <ArrowDropDown />
                    </p>
                    {
                        openDropdown &&
                        (
                            <div className="absolute top-[55px] right-0 p-2 rounded-md w-full bg-indigo-500 flex flex-col gap-2">
                                <button className="p-2 rounded-md flex items-center bg-black gap-2 cursor-pointer">
                                    <AccountCircle />
                                    <p>
                                        Profile
                                    </p>
                                </button>
                                <button className="p-2 rounded-md flex items-center bg-black gap-2 cursor-pointer" onClick={handleLogout}>
                                    <Logout />
                                    <p>
                                        Log out
                                    </p>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;