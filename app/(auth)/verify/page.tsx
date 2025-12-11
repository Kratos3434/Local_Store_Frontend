import { authenticateVerifyToken } from "@/controller/auth.controller";
import { USER_VERIFY_TOKEN } from "@/data"
import Verify from "@/components/Verify";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

const VerifyPage = async () => {
    const token = (await cookies()).get(USER_VERIFY_TOKEN)?.value;

    if (!token) {
        redirect('/');
    }

    let email = "";

    try {
        email = await authenticateVerifyToken(`${USER_VERIFY_TOKEN}=${token}`);
    } catch {
        redirect('/');
    }

    return <Verify email={email} />;
}

export default VerifyPage;