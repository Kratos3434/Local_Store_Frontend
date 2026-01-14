'use client'

import { useForm } from "react-hook-form";
import Input from "./Input";
import { ProductDTO } from "@/data";
import { Close, FileUpload, Label } from "@mui/icons-material";
import { useState } from "react";
import Select from "react-select";
import SubmitButton from "./SubmitButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductCategories } from "@/controller/product-category.controller";
import { addProduct } from "@/controller/product.controller";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddProduct = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductDTO>();

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, isLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const router = useRouter();
    const queryClient = useQueryClient();

    const { status: productCategoryStatus, data: productCategoryData } = useQuery({
        queryKey: ['product-categories'],
        queryFn: getProductCategories
    });

    const options = productCategoryData?.map(cat => ({
        value: cat.name,
        label: cat.name
    })) ?? [];

    const handleAddProduct = async (data: ProductDTO) => {
        isLoading(true);
        setErrorMessage("");
        try {
            await addProduct(data);
            await queryClient.invalidateQueries({
                queryKey: ['products']
            });
            router.push('/seller/dashboard/products');
        } catch (err: any) {
            setErrorMessage(err.message);
            isLoading(false);
        }
    }

    return (
        <div className="w-full flex justify-center items-center pb-3">
            <div className="w-full max-w-[700px] mt-5">
                <h1 className="font-bold text-2xl">
                    Add a Product
                </h1>
                <hr className="my-3" />
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleAddProduct)}>
                    <Input label="Name" type="text" register={register('name', { required: "Name is required" })} errorMessage={errors.name && errors.name.message} placeholder="Gaming Mouse" />
                    <div>
                        <label>Description</label>
                        <textarea {...register('description', { required: "Description is required" })} className="w-full rounded-md bg-white resize-none outline-indigo-500 p-2 mt-2 border border-black" rows={10} placeholder="Describe your product" />
                        {errors.description && <small className="text-red-500">*{errors.description.message}</small>}
                    </div>
                    <Input label="Price (in CAD)" type="text" register={register('priceInCad', { required: "Price is required" })} errorMessage={errors.priceInCad && errors.priceInCad.message} placeholder="99.99" />
                    <div className="mt-3">
                        <p>Product Photo</p>
                        {
                            !preview ?
                                (
                                    <label className="w-full px-4 py-2 bg-gray-300 rounded-md h-[300px] flex justify-center items-center cursor-pointer hover:brightness-95 mt-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register('featuredPhotoURL', { required: "Please upload a photo of your product" })}
                                            className="hidden"
                                            onChange={e => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setPreview(URL.createObjectURL(file));
                                                    register('featuredPhotoURL').onChange(e);
                                                }
                                            }}
                                        />
                                        <div className="text-center">
                                            <div className="text-xl">
                                                <FileUpload />
                                            </div>
                                            <p className="text-lg">
                                                Upload product photo
                                            </p>
                                        </div>
                                    </label>
                                ) :
                                (
                                    <div className="rounded-md border border-black p-2 relative mt-3">
                                        <div className="absolute right-2 top-2 rounded-full bg-gray-300 p-1 cursor-pointer" onClick={() => setPreview(null)}>
                                            <Close />
                                        </div>
                                        <Image width={700} height={300} className="w-full max-w-[700px] h-full max-h-[500px] rounded-md" src={preview} alt="Product Photo" />
                                    </div>
                                )
                        }
                        {errors.featuredPhotoURL && <small className="text-red-500">*{errors.featuredPhotoURL.message}</small>}
                    </div>
                    <div>
                        <label>Is this product new?</label>
                        <Select options={[
                            {
                                label: "Yes", value: "Yes"
                            },
                            {
                                label: "No", value: "No"
                            }
                        ]} className="mt-2"
                            onChange={(selected) => {
                                if (selected) {
                                    if (selected.label === "Yes") {
                                        setValue('isNew', true);
                                    } else {
                                        setValue('isNew', false);
                                    }
                                }
                            }}
                        />
                    </div>
                    <Input type="text" label="Quantiy" register={register('quantity', { required: 'Quantity is required' })} errorMessage={errors.quantity && errors.quantity.message} />
                    <div>
                        <label>Category</label>
                        <Select options={options} className="mt-2" onChange={(selected) => {
                            if (selected) {
                                setValue('category', selected.value);
                            }
                        }} />
                    </div>
                    <div>
                        <label>Tags (Keywords for search visibility)</label>
                        <div className="w-full rounded-md p-2 flex items-center border border-black mt-2 gap-2 flex-wrap">
                            {
                                tags.map((e, idx) => {
                                    return (
                                        <div key={idx} className="rounded-md p-4 bg-indigo-500 text-white break-all relative">
                                            <div className="absolute right-0 top-[-5px] text-[20px] cursor-pointer" onClick={() => {
                                                setTags(prev => prev.filter(item => item != e));
                                                setValue('tags', tags.filter(item => item != e));
                                            }}>
                                                <Close fontSize="inherit" />
                                            </div>
                                            <p>
                                                {e}
                                            </p>
                                        </div>
                                    );
                                })
                            }
                            <input className="flex-1 outline-none" type="text" onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (e.currentTarget.value) {
                                        const value = e.currentTarget.value;
                                        setTags(prev => [...prev, value]);
                                        e.currentTarget.value = "";
                                        setValue('tags', [...tags, value]);
                                    }
                                }
                            }} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-10 text-center">
                        {errorMessage && <small className="text-red-500">*{errorMessage}</small>}
                        <div className="mt-3">
                            <SubmitButton loading={loading} title="Add Product" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;