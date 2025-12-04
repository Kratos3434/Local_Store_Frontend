'use client'

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const SecureInput = ({ register, placeholder, label, errorMessage }: {
    register: UseFormRegisterReturn<any>,
    placeholder?: string,
    label: string,
    errorMessage?: string
}) => {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="mt-3">
            <label>
                {label}
            </label><br />
            <div className="flex items-center gap-1 bg-white rounded-md p-2 outline-none mt-1 border border-black focus:border-indigo-500 focus:border-[3px]">
                <input className="w-full outline-none mt-1"
                    type={showPass ? 'text' : 'password'} {...register} placeholder={placeholder} />
                <div className="cursor-pointer" onClick={() => setShowPass(!showPass)}>
                    {
                        showPass ?
                        <Visibility /> : <VisibilityOff />
                    }
                </div>
            </div>
            {errorMessage && <small className="text-red-600">*{errorMessage}</small>}
        </div>
    );
}

export default SecureInput;