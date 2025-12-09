import { authenticateSellerVerifyToken } from "@/controller/auth.controller";
import { SELLER_VERIFY_TOKEN } from "@/data";
import SellerVerify from "@/pages/SellerVerify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SellerVerifyPage = async () => {
    const token = (await cookies()).get(SELLER_VERIFY_TOKEN)?.value;

    if (!token) {
        redirect('/seller');
    }

    let email = "";

    try {
        email = await authenticateSellerVerifyToken(`${SELLER_VERIFY_TOKEN}=${token}`);
    } catch {
        redirect('/seller');
    }

    return <SellerVerify email={email} />;
}

export default SellerVerifyPage;