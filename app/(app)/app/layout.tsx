import HomeNavBar from "@/components/HomeNavBar";
import { getProfile } from "@/controller/user.controller";
import { USER_SESSION_TOKEN, UserDTO } from "@/data"
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const metadata = {
  title: "Local Store | App",
  description: "Browse presonalized stores from your area",
};

const AppLayout = async ({children}: {children: React.ReactNode}) => {
    const token = (await cookies()).get(USER_SESSION_TOKEN)?.value;

    if (!token) {
        redirect('/');
    }

    let user: UserDTO;

    try {
        user = await getProfile(`${USER_SESSION_TOKEN}=${token}`);
    } catch {
        redirect('/');
    }

    return (
        <main className="pt-[60px] px-3">
            <HomeNavBar user={user} />
            {children}
        </main>
    )
}

export default AppLayout;