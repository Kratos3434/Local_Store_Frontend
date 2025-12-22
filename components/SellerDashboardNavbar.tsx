'use client'

import { Close, Cottage, Inventory, Menu } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SellerDashboardNavbar = () => {
    const baseUrl = "/seller/dashboard";
    const pathname = usePathname();

    const [openMenu, setOpenMenu] = useState(false);

    const options = [
        {
            url: baseUrl,
            title: "Home",
            icon: <Cottage />
        },
        {
            url: `${baseUrl}/products`,
            title: "Products",
            icon: <Inventory />
        }
    ]

    return (
        <nav className="fixed top-0 left-0 sm:h-dvh max-sm:h-[60px] max-sm:w-full max-ww-[70px] bg-indigo-500 py-4 sm:px-2 text-white font-bold text-xl">
            <div className="flex flex-col gap-5 max-sm:hidden">
                {
                    options.map((e, idx) => {
                        return (
                            <Link href={e.url} key={idx} className={`p-2 ${e.url === pathname ? "bg-indigo-400" : "hover:bg-indigo-400"} rounded-md flex items-center gap-3`}>
                                {e.icon}
                                <p>{e.title}</p>
                            </Link>
                        );
                    })
                }
            </div>
            <div className="sm:hidden px-2">
                <button onClick={() => setOpenMenu(true)}>
                    <Menu />
                </button>
            </div>
            {
                openMenu &&
                (
                    <div className="fixed top-0 w-full h-dvh bg-[rgba(0,0,0,0.5)] flex justify-start sm:hidden z-1" onClick={() => setOpenMenu(false)}>
                        <div className="flex flex-col gap-5 bg-indigo-500 px-2 py-4" onClick={e => e.stopPropagation()}>
                            <div>
                                <button onClick={() => setOpenMenu(false)}>
                                    <Close />
                                </button>
                            </div>
                            {
                                options.map((e, idx) => {
                                    return (
                                        <Link href={e.url} key={idx} className={`p-2 ${e.url === pathname ? "bg-indigo-400" : "hover:bg-indigo-400"} rounded-md flex items-center gap-3`}>
                                            {e.icon}
                                            <p>{e.title}</p>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                )
            }
        </nav>
    );
}


export default SellerDashboardNavbar;