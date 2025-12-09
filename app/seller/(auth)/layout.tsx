
const SellerAuthRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <div className="px-2">
                {children}
            </div>
        </main>
    )
}

export default SellerAuthRootLayout;