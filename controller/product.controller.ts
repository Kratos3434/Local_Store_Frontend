import { Product } from "@/data";
import { productEndpoint } from "@/endpoints";
import { createRequest } from "@/utils/createRequest";

export const getProducts = async (): Promise<Product[]> => {
    const res = await createRequest({
        url: productEndpoint.list,
        method: 'GET'
    });

    return res.data;
}