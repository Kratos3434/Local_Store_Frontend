import { getSellerProfile } from "@/controller/seller.controller";
import { Seller, SELLER_SESSION_TOKEN } from "@/data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SellerDashboardRootLayout = async ({children}: {children: React.ReactNode}) => {
    const token = (await cookies()).get(SELLER_SESSION_TOKEN)?.value;

    if (!token) {
        redirect('/seller');
    }

    let seller: Seller;

    try {
        seller = await getSellerProfile(`${SELLER_SESSION_TOKEN}=${token}`);
    } catch {
        redirect('/seller');
    }

    return (
        <main>
            {children}
        </main>
    );
}

export default SellerDashboardRootLayout;