import SellerDashboardNavbar from "@/components/SellerDashboardNavbar";
import { getStoreProfile } from "@/controller/store.controller";
import { SELLER_SESSION_TOKEN, Store } from "@/data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SellerDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const token = (await cookies()).get(SELLER_SESSION_TOKEN)?.value;

    if (!token) {
        redirect('/seller');
    }

    let store: Store | null;

    try {
        store = await getStoreProfile(`${SELLER_SESSION_TOKEN}=${token}`);
    } catch (err) {
        console.log(err)
        redirect('/seller');
    }

    if (!store) {
        // console.log("Store is null")
        redirect('/seller/create-store');
    }

    return (
        <div className="pl-40 pr-2">
            <SellerDashboardNavbar />
            {children}
        </div>
    )
}

export default SellerDashboardLayout;