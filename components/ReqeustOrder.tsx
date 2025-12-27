"use client"

import { Create_Order, Product } from "@/data";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Input from "./Input";

const RequestOrder = ({ product, closer }: { product: Product, closer: any }) => {
    // const { register, handleSubmit, setValue, formState: { errors } } = useForm<Create_Order>({
    //     defaultValues: {
    //         productId: product.id
    //     }
    // });

    return (
        <div className="w-full max-w-[600px] bg-white shadow-lg rounded-md py-2 px-4">
            {/* <div className="flex justify-end items-center">
                <button className="cursor-pointer" onClick={() => { closer(false) }}>
                    <Close />
                </button>
            </div>
            <p className="text-xl font-bold">
                Request an Order
            </p>
            <div className="p-2 rounded-md bg-red-500 text-white my-2">
                <small className="p-2 rounded-md bg-red-500 text-white">
                    <b>Notice:</b> Please meet in a crowded place like shopping malls or cafes and during daytime. Do not pay until you have confirmed the product.
                </small>
            </div>
            <hr className="my-3" />
            <form className="mt-5">
                <Input label="Preferred Meeting Place" type="text" register={register('preferredMeetingPlace', { required: 'Preferred meeting place is required' })} errorMessage={errors.preferredMeetingPlace && errors.preferredMeetingPlace.message} />
            </form> */}
            <div className="flex justify-end items-center">
                <button className="cursor-pointer" onClick={() => { closer(false) }}>
                    <Close />
                </button>
            </div>
            <p className="text-xl font-bold text-center p-4">Page still in progress</p>
        </div>
    );
}

export default RequestOrder;