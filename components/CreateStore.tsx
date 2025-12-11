"use client"

import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import { getStoreCategories } from "@/controller/store-category.controller";
import { createStore } from "@/controller/store.controller";
import { StoreDTO } from "@/data";
import { getCities } from "@/data/canada-cities";
import { provinceOptions } from "@/data/canada-province";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select';

const CreateStore = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<StoreDTO>();

    // const [categoryOptions, setCategoryOptions] = useState<{value: string, label: string}[]>([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [loading, isLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const { status, data } = useQuery({
        queryKey: ['store-categories'],
        queryFn: getStoreCategories
    });

    const options = data?.map(cat => ({
        value: cat.name,
        label: cat.name
    })) ?? [];

    const handleCreateStore = async (data: StoreDTO) => {
        isLoading(true);
        setErrorMessage("");
        try {
            await createStore(data);
            router.replace("/seller/dashboard");
        } catch (err: any) {
            setErrorMessage(err.message);
            isLoading(false);
        }
    }

    return (
        <div className="w-full flex justify-center py-10 bg-indigo-500 px-2">
            <div className="w-full max-w-[700px] bg-white rounded-md p-4 shadow-lg">
                <h1 className="text-3xl font-bold text-center">
                    Create Store
                </h1>
                <hr className="my-3 " />
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleCreateStore)}>
                    <Input label="Name" type="text" register={register('name', { required: "Name is required" })} errorMessage={errors.name && errors.name.message} placeholder="John's Store" />
                    <div>
                        <label>Description</label>
                        <textarea {...register('description', { required: "Description is required" })} className="w-full rounded-md bg-white resize-none outline-indigo-500 p-2 mt-2 border border-black" rows={10} placeholder="Describe your store" />
                        {errors.description && <small className="text-red-500">*{errors.description.message}</small>}
                    </div>
                    <div>
                        <label>Category</label>
                        <div className="mt-2">
                            {
                                status === 'error' ?
                                    (
                                        <p>error loading categories</p>
                                    )
                                    :
                                    (
                                        status === 'pending' ?
                                            <CircularProgress /> :
                                            (
                                                <Select options={options} onChange={(selected) => {
                                                    if (selected) {
                                                        setValue('category', selected.value);
                                                    }
                                                }} />
                                            )
                                    )
                            }
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center mt-10">
                        Store Address
                    </h2>
                    <hr className="my-3 " />
                    <Input label="Address line 1" type="text" register={register('address.addressLine1', { required: "Address line 1 is required" })} errorMessage={errors.address?.addressLine1 && errors.address.addressLine1.message} placeholder="123 John Street" />
                    <Input label="Address line 2 (optional)" type="text" register={register('address.addressLine2')} errorMessage={errors.address?.addressLine2 && errors.address.addressLine2.message} />
                    <div>
                        <label>
                            Province
                        </label>
                        <Select options={provinceOptions} onChange={(selected) => {
                            if (selected) {
                                setValue('address.province', selected.value);
                                setSelectedProvince(selected.value);
                            }
                        }} />
                    </div>
                    <div>
                        <label>
                            City
                        </label>
                        <Select options={
                            !selectedProvince ? [{ value: "", label: "Please select a province" }] : getCities(selectedProvince)
                        } onChange={(selected) => {
                            if (selected) {
                                setValue('address.city', selected.value);
                            }
                        }} isDisabled={selectedProvince ? false : true} />
                    </div>
                    <Input label="Postal code" type="text" register={register('address.postalCode', { required: "Postal code is required" })} errorMessage={errors.address?.postalCode && errors.address.postalCode.message} placeholder="X1X 1X1 or X1X1X1" />
                    <div className="flex flex-col items-center justify-center mt-10">
                        {errorMessage && <small className="text-red-500">*{errorMessage}</small>}
                        <div className="mt-2">
                            <SubmitButton loading={loading} title="Create Store" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateStore;