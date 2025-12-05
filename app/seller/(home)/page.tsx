import Link from "next/link";

const SellerPage = () => {
    return (
        <div className="h-dvh w-full bg-indigo-500 p-4 py-10 flex justify-center items-center">
            <div>
                <h1 className="text-4xl font-bold text-white text-center">
                Become a Local Store Seller
            </h1>
            <div className="py-10 flex justify-center">
                <Link href="/seller/signup" className="text-white font-bold rounded-full py-5 px-10 bg-black text-xl border-2 border-white">
                    Sign up
                </Link>
            </div>
            <p className="text-center text-white font-bold">
                It{"'s"} quick and 100% FREE
            </p>
            <hr className="my-3" />
            <div className=" text-xl bg-amber-300 p-4 rounded-md font-bold shadow-lg">
                <ul className="list-disc pl-5 space-y-2">
                    <li>Earn 100% on meetups (no marketplace or payment fees)</li>
                    <li>Set your own prices and keep full control of your margins</li>
                    <li>Set your own shipping fee per province</li>
                    <li>Instant payment when selling locally (cash/e-transfer)</li>
                    <li>No shipping required, saving time and costs</li>
                    <li>Sell faster to nearby buyers</li>
                    <li>Direct buyer communication for smoother transactions</li>
                    <li>Build a local customer base for repeat sales</li>
                    <li>Flexible availability — meet where and when you want</li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default SellerPage;