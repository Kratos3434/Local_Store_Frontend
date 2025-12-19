'use client'

import { Cottage, Inventory } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SellerDashboardNavbar = () => {
    const baseUrl = "/seller/dashboard";
    const pathname = usePathname();

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
        <nav className="fixed top-0 left-0 h-dvh ww-full max-ww-[70px] bg-indigo-500 py-4 px-2 flex flex-col gap-5 text-white font-bold text-xl">
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
        </nav>
    );
}


export default SellerDashboardNavbar;