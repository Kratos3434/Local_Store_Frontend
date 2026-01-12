"use client"

import Link from "next/link";
import Modal from "./Modal";
import { useSetAtom } from "jotai";
import { openSignupBannerAtom } from "@/store";
import { Close } from "@mui/icons-material";

const SignupNow = () => {
    const setOpenSignupBanner = useSetAtom(openSignupBannerAtom);

    return (
        <Modal>
            <div className="w-full max-w-[600px] px-4 py-3 bg-white rounded-md flex justify-center relative">
                <button className="absolute right-4 cursor-pointer" onClick={() => setOpenSignupBanner(false)}>
                    <Close />
                </button>
                <div className="text-center">
                    <p className="font-bold text-3xl">
                        Sign up Now!
                    </p>
                    <p className="mt-5">
                        See products near you and schedule a meetup now.
                    </p>
                    <b>
                        Click the link below to Sign up now!
                    </b>
                    <div className="mt-10 mb-5">
                        <Link href="/signup" className="px-10 py-3 bg-indigo-500 rounded-full text-white font-bold text-2xl hover:brightness-95" onClick={() => setOpenSignupBanner(false)}>
                            Sign up
                        </Link>
                    </div>
                    <p>or</p>
                    <div className="my-2 mt-5">
                        <Link href="/signin" className="text-lg text-blue-500 font-bold hover:underline" onClick={() => setOpenSignupBanner(false)}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SignupNow;