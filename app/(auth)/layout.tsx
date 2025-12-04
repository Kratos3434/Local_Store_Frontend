
const AuthRootLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="px-2 bg-indigo-500">
            {children}
        </main>
    );
}

export default AuthRootLayout;