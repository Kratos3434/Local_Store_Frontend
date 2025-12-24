'use client'

import { UserDTO } from "@/data";
import { userAtom } from "@/store";
import { AccountCircle, ArrowDropDown, Logout, ShoppingCartOutlined } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomeNavBar = ({ user }: { user: UserDTO | null }) => {
    useHydrateAtoms([[userAtom, user]], { dangerouslyForceHydrate: true });

    const queryClient = useQueryClient();

    const [openDropdown, setOpenDropdown] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/local_api/cookies/session', { method: 'DELETE' });
        queryClient.clear();
        router.replace("/signin");
    }

    return (
        <nav className="fixed top-0 left-0 w-full h-[60px] fflex jjustify-between bg-indigo-500 px-4 iitems-center">
            <div className="relative w-full flex justify-center items-center">
                <div className="absolute left-4 top-3">
                    <Link href="/" className="text-white font-bold text-2xl">
                        Local Store
                    </Link>
                </div>
                <div className="flex items-center gap-5 absolute right-4 top-2">
                    {
                        user ?
                            (
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
                            ) :
                            (
                                <>
                                    <Link href="/signin" className="text-white font-bold">
                                        Sign in
                                    </Link>
                                    <Link href="/signup" className="text-white font-bold py-2 px-5 rounded-full bg-black">
                                        Sign up
                                    </Link>
                                </>
                            )
                    }
                    <button className="text-white cursor-pointer">
                        <ShoppingCartOutlined />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;