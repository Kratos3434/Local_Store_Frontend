import { Product_Category } from "@/data";
import { productCategoryEndpoint } from "@/endpoints";
import { createRequest } from "@/utils/createRequest";

export const getProductCategories = async (): Promise<Product_Category[]> => {
    const res = await createRequest({
        url: productCategoryEndpoint.list,
        method: 'GET'
    });

    return res.data;
}