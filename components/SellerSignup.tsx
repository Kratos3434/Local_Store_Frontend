'use client'

import Input from "@/components/Input";
import SecureInput from "@/components/SecureInput";
import SubmitButton from "@/components/SubmitButton";
import { sellerSignup } from "@/controller/auth.controller";
import { SignupDTO } from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SellerSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupDTO>();

    const [loading, isLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSellerSignup = async (data: SignupDTO) => {
        isLoading(true);
        setErrorMessage("");
        try {
            await sellerSignup(data);
            router.push("/seller/verify");
        } catch (err: any) {
            setErrorMessage(err.message);
            isLoading(false);
        }
    }

    return (
        <div className="w-full max-sm:h-dvh md:h-dvh py-2 bg-indigo-500 flex justify-center items-center">
            <div className="w-full max-w-[500px] bg-white rounded-md shadow-lg py-4 px-4">
                <h1 className="text-3xl font-bold">
                    Seller Sign up
                </h1>
                <hr className="my-3" />
                <form onSubmit={handleSubmit(handleSellerSignup)}>
                    <Input label="Email" type="email" register={register('email', { required: "email is required" })} errorMessage={errors.email && errors.email.message} />
                    <Input label="First name" type="text" register={register('firstName', { required: "first name is required" })} errorMessage={errors.firstName && errors.firstName.message} />
                    <Input label="Last name" type="text" register={register('lastName', { required: "last name is required" })} errorMessage={errors.lastName && errors.lastName.message} />
                    <SecureInput label="Password" register={register('password', { required: "password is required" })} errorMessage={errors.password && errors.password.message} />
                    <SecureInput label="Confirm password" register={register('password2', { required: "please confirm your password" })} errorMessage={errors.password2 && errors.password2.message} />
                    <div className="flex flex-col items-center mt-10">
                        {errorMessage && <small className="text-red-500 font-bold">*{errorMessage}</small>}
                        <div className="mt-1">
                            <SubmitButton loading={loading} title="Sign up" />
                        </div>
                        <p className="mt-5">
                            Already have a seller account? <Link href="/seller/signin" className="text-blue-500 hover:underline font-bold">sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellerSignup;