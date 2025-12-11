'use client'

import Input from "@/components/Input";
import SecureInput from "@/components/SecureInput";
import SubmitButton from "@/components/SubmitButton";
import { signin } from "@/controller/auth.controller";
import { Launch } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string, password: string }>();

    const [loading, isLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSignin = async (data: { email: string, password: string }) => {
        isLoading(true);
        setErrorMessage("");
        try {
            await signin(data.email, data.password);
            router.push('/');
        } catch (err: any) {
            if (err.statusCode === 401) {
                router.push("/verify");
            } else {
                setErrorMessage(err.message);
                isLoading(false);
            }
        }
    }

    return (
        <div className="w-full h-dvh bg-indigo-500 flex justify-center items-center flex-col">
            <div className="w-full max-w-[500px] bg-white rounded-md shadow-lg py-4 px-4">
                <h1 className="text-3xl font-bold">
                    Sign in
                </h1>
                <hr className="my-3" />
                <form onSubmit={handleSubmit(handleSignin)}>
                    <Input label="Email" type="email" register={register('email', { required: "email is required" })} errorMessage={errors.email && errors.email.message} />
                    <SecureInput label="Password" register={register('password', { required: 'password is required' })} errorMessage={errors.password && errors.password.message} />
                    <div className="flex flex-col items-center mt-10">
                        {errorMessage && <small className="text-red-500 font-bold">*{errorMessage}</small>}
                        <div className="mt-1">
                            <SubmitButton loading={loading} title="Sign in" />
                        </div>
                        <p className="mt-5">
                            Don{"'t"} have an account yet? <Link href="/signup" className="text-blue-500 hover:underline font-bold">register</Link>
                        </p>
                    </div>
                </form>
            </div>
            <Link href="/seller" className="rounded-md bg-white p-4 mt-5 w-full max-w-[500px] flex flex-col items-center font-bold hover:brightness-95 relative" 
            target="_blank" rel="noopener noreferrer">
                <p className="text-xl">
                    Become a Seller
                </p>
                <div className="absolute right-4">
                    <Launch />
                </div>
            </Link>
        </div>
    );
}

export default Signin;