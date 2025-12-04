'use client'

import { UseFormRegisterReturn } from "react-hook-form";

const Input = ({register, type, placeholder, label, errorMessage, maxLength}: {
    register: UseFormRegisterReturn<any>,
    type: string,
    placeholder?: string,
    label: string,
    errorMessage?: string,
    maxLength?: number
}) => {
    return (
        <div className="mt-3">
            <label>
                {label}
            </label><br />
            <input className="w-full bg-white rounded-md p-2 outline-none mt-1 border border-black focus:border-indigo-500 focus:border-[3px]"
                type={type} {...register} placeholder={placeholder} maxLength={maxLength} />
            {errorMessage && <small className="text-red-600">*{errorMessage}</small>}
        </div>
    );
}

export default Input;