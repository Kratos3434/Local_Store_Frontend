"use client"

import { Create_Order, Product } from "@/data";
import { Add, Close, EmojiEmotions, Remove } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { useState } from "react";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import { requestOrder } from "@/controller/order.controller";
import { useQueryClient } from "@tanstack/react-query";

const RequestOrder = ({ product, closer }: { product: Product, closer: any }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Create_Order>({
        defaultValues: {
            productId: product.id
        }
    });

    const [loading, isLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const queryClient = useQueryClient();

    const handleRequestOrder = async (data: Create_Order) => {
        isLoading(true);
        setErrorMessage("");
        try {
            await requestOrder(data);
            await queryClient.invalidateQueries({
                queryKey: [`public-product-${product.id}`],
            });
            setShowMessage(true);
        } catch (err: any) {
            setErrorMessage(err.message);
            isLoading(false);
        }
    }

    return (
        <div className="w-full max-w-[600px] max-h-[865px] h-full bg-white shadow-lg rounded-md py-2 px-4 pb-5 overflow-y-auto">
            <div className="flex justify-end items-center sticky top-0">
                <button className="cursor-pointer" onClick={() => { closer(false) }}>
                    <Close />
                </button>
            </div>
            {
                !showMessage ?
                    (
                        <div>
                            <p className="text-xl font-bold">
                                Request an Order
                            </p>
                            <div className="p-2 rounded-md bg-red-500 text-white my-2">
                                <small className="p-2 rounded-md bg-red-500 text-white">
                                    <b>Notice:</b> Please meet in a crowded place like shopping malls or cafes and during daytime. Do not pay until you have confirmed the product.
                                </small>
                            </div>
                            <hr className="my-3" />
                            <form className="mt-5" onSubmit={handleSubmit(handleRequestOrder)}>
                                <Input placeholder="Shopping Mall" label="Preferred Meeting Place (Be specific)" type="text" register={register('preferredMeetingPlace', { required: 'Preferred meeting place is required' })} errorMessage={errors.preferredMeetingPlace && errors.preferredMeetingPlace.message} />
                                <div className="my-7">
                                    <DateTimePicker label="Preferred Meetup Date" onChange={(val) => setValue('preferredMeetupDate', val!.toDate())} />
                                </div>
                                <Input type="tel" label="Contact number" register={register('contactNumber', { required: "Contact number is required" })} errorMessage={errors.contactNumber && errors.contactNumber.message} />
                                <div className="flex items-center gap-2 my-5">
                                    <p>Quantity:</p>
                                    <div className="flex gap-3 items-center">
                                        <div className="cursor-pointer" onClick={() => {
                                            if (currentQuantity > 0) {
                                                setValue('quantity', currentQuantity - 1);
                                                setCurrentQuantity(currentQuantity - 1);
                                            }
                                        }}>
                                            <Remove />
                                        </div>
                                        <b className="px-4 p-1 rounded-md border bg-gray-300">
                                            {currentQuantity}
                                        </b>
                                        <div className="cursor-pointer" onClick={() => {
                                            if (currentQuantity < product.quantity) {
                                                setValue('quantity', currentQuantity + 1);
                                                setCurrentQuantity(currentQuantity + 1);
                                            }
                                        }}>
                                            <Add />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label>Notes (optional)</label>
                                    <textarea {...register('notes')} className="w-full rounded-md bg-white resize-none outline-indigo-500 p-2 mt-2 border border-black" rows={10} placeholder="Additional instructions" />
                                </div>
                                <div className="flex flex-col justify-center items-center mt-10">
                                    {errorMessage && <small className="text-red-500">*{errorMessage}</small>}
                                    <div className="mt-2">
                                        <SubmitButton loading={loading} title="Request Order" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) :
                    (
                        <div className="flex justify-center items-center">
                            <div className="mt-5">
                                <div className="flex justify-center items-center text-[60px] text-green-400">
                                    <EmojiEmotions fontSize="inherit" />
                                </div>
                                <p className="text-xl mt-5">
                                    Your order has been sent. We will let you know once the seller approves or cancels your order. Once approved, please show up at the meeting place on time
                                </p>
                                <div className="flex justify-center items-center mt-10">
                                    <Link href="/" className="text-white bg-indigo-500 font-bold rounded-md py-4 px-6 cursor-pointer hover:brightness-95">
                                        Continue browsing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default RequestOrder;