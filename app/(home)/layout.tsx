import HomeNavBar from "@/components/HomeNavBar";
import { getProfile } from "@/controller/user.controller";
import { USER_SESSION_TOKEN, UserDTO } from "@/data";
import { cookies } from "next/headers";

export const metadata = {
  title: "Local Store | Home",
  description: "Browse hundreds of new and used items from your local area",
};

const HomeLayout = async ({children}: {children: React.ReactNode}) => {
    const token = (await cookies()).get(USER_SESSION_TOKEN)?.value;

    let user: UserDTO | null = null;

    try {
        user = await getProfile(`${USER_SESSION_TOKEN}=${token}`);
    } catch {
        console.log("User not logged in");
    }

    return (
        <main className="pt-[60px] px-3">
            <HomeNavBar user={user} />
            {children}
        </main>
    )
}

export default HomeLayout;