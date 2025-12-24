'use client'

import { Product } from "@/data"
import { Visibility } from "@mui/icons-material"
import Link from "next/link";

const ProductCard = ({ product, canView }: { product: Product, canView?: boolean }) => {
    return (
        <div className="w-full sm:max-w-[300px] rounded-md bg-indigo-500 text-white">
            <img width={200} height={300} className="w-full h-[300px] rounded-t-xl p-2" src={product.featuredPhotoURL} />
            <div className="px-4 pb-5">
                <hr className="my-2" />
                <p className="font-bold text-xl">
                    ${product.priceInCad}
                </p>
                <p className="mt-5 font-bold text-lg">
                    {product.name}
                </p>
                <p className="mt-5">
                    Conditions <b>{product.isNew ? "New" : "Used"}</b>
                </p>
                <p className="mt-3">
                    In stock: <b>{product.quantity}</b>
                </p>
                {
                    canView &&
                    (
                        <div className="mt-5">
                            <Link href={`/seller/dashboard/products/${product.id}`} className="w-full flex justify-center items-center gap-2 p-2 rounded-md bg-green-400 hover:brightness-95 cursor-pointer">
                                <Visibility />
                                <p>
                                    View
                                </p>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ProductCard;