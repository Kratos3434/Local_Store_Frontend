'use client'

import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
import { sendSellerOtp, verifySeller } from "@/controller/auth.controller";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SellerVerify = ({ email }: { email: string }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ otp: string }>();

    const [loading, isLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    const [resendLoading, isResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState("");

    const handleVerifyUser = async (data: { otp: string }) => {
        isLoading(true);
        setErrorMessage("");
        try {
            await verifySeller(data.otp);

            await fetch('/local_api/cookies/seller/verify', { method: 'DELETE' });

            router.replace('/seller/signin');
        } catch (err: any) {
            setErrorMessage(err.message);
            isLoading(false);
        }
    }

    const handleSendOtp = async () => {
        setOpenModal(true);
        isResendLoading(true);
        setResendMessage("");
        try {
            const message = await sendSellerOtp();
            setResendMessage(message);
        } catch (err: any) {
            setResendMessage(err.message);
        }

        isResendLoading(false);
    }

    return (
        <div className="w-full h-dvh bg-indigo-500 flex justify-center items-center">
            <div className="w-full max-w-[500px] bg-white shadow-lg p-4 rounded-md">
                <h1 className="text-3xl font-bold">
                    Seller Verify
                </h1>
                <hr className="my-3" />
                <small>
                    verifying <b>{email}{"'s"}</b> email
                </small>
                <form className="font-bold" onSubmit={handleSubmit(handleVerifyUser)}>
                    <Input label="OTP" type="text" register={register('otp', { required: "otp is required" })} errorMessage={errors.otp && errors.otp.message} maxLength={6} />
                    <small className="text-blue-500 hover:underline cursor-pointer" onClick={handleSendOtp}>
                        resend otp?
                    </small>
                    <div className="flex flex-col items-center mt-10">
                        {errorMessage && <small className="text-red-500 font-bold">*{errorMessage}</small>}
                        <div className="mt-1">
                            <SubmitButton loading={loading} title="Verify" />
                        </div>
                    </div>
                </form>
            </div>
            {
                openModal &&
                (
                    <Modal>
                        <div className="rounded-md bg-white p-4 shadow-lg w-full max-w-[600px] text-center">
                            <h2 className="text-3xl font-bold">
                                Send OTP
                            </h2>
                            <hr className="my-3" />
                            {
                                resendLoading ?
                                    (
                                        <CircularProgress />
                                    ) :
                                    (
                                        <div>
                                            <p>
                                                {resendMessage}
                                            </p>
                                            <div className="mt-10">
                                                <button className="py-2 px-10 rounded-md bg-indigo-500 text-white font-bold cursor-pointer hover:brightness-95" onClick={() => setOpenModal(false)}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}

export default SellerVerify;