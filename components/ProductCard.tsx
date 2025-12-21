'use client'

import { Product } from "@/data"
import { Edit } from "@mui/icons-material"

const ProductCard = ({product}: {product: Product}) => {
    return (
        <div className="w-full max-w-[300px] rounded-md bg-indigo-500 text-white">
            <img width={200} height={300} className="w-full h-[300px] rounded-t-md p-2" src={product.featuredPhotoURL} />
            <div className="px-4 pb-5">
                <hr className="my-2" />
                <p className="font-bold">
                    ${product.priceInCad}
                </p>
                <p className="mt-5">
                    {product.name}
                </p>
                <div className="mt-5">
                    <button className="w-full flex justify-center items-center gap-2 p-2 rounded-md bg-green-400 hover:brightness-95 cursor-pointer">
                        <Edit />
                        <p>
                            Edit
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;