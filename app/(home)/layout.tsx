import HomePublicNavBar from "@/components/HomePublicNavBar";

export const metadata = {
  title: "Local Store | Home",
  description: "Browse hundreds of new and used items from your local area",
};

const HomeLayout = ({children}: {children: React.ReactNode}) => {

    return (
        <main className="pt-[60px] px-3">
            <HomePublicNavBar />
            {children}
        </main>
    )
}

export default HomeLayout;