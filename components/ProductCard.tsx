'use client'

import { Product } from "@/data"
import { Visibility } from "@mui/icons-material"
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product, canView }: { product: Product, canView?: boolean }) => {
    return (
        canView ?
            (
                <div className="w-full sm:max-w-[250px] rounded-md bg-indigo-500 text-white">
                    <Image width={200} height={250} className="w-full h-[250px] rounded-t-xl p-2" src={product.featuredPhotoURL} alt={product.name} />
                    <div className="px-4 pb-5">
                        <hr className="my-2" />
                        <p className="font-bold ttext-xl">
                            ${product.priceInCad}
                        </p>
                        <p className="mt-5 font-bold ttext-lg">
                            {product.name}
                        </p>
                        <p className="mt-5">
                            Condition: <b>{product.isNew ? "New" : "Used"}</b>
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
            ) :
            (
                <Link href={`/product/${product.id}`} className="w-full sm:max-w-[250px] rounded-md bg-indigo-500 text-white">
                    <Image width={200} height={250} className="w-full h-[250px] rounded-t-xl p-2" src={product.featuredPhotoURL} alt={product.name} />
                    <div className="px-4 pb-5">
                        <hr className="my-2" />
                        <p className="font-bold ttext-xl">
                            ${product.priceInCad}
                        </p>
                        <p className="mt-5 font-bold ttext-lg">
                            {product.name}
                        </p>
                        <p className="mt-5">
                            Condition: <b>{product.isNew ? "New" : "Used"}</b>
                        </p>
                        <p className="mt-3">
                            In stock: <b>{product.quantity}</b>
                        </p>
                    </div>
                </Link>
            )
    );
}

export default ProductCard;