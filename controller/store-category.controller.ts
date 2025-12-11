import { Store_Category } from "@/data";
import { storeCategoryEndpoint } from "@/endpoints";
import { createRequest } from "@/utils/createRequest";

export const getStoreCategories = async (): Promise<Store_Category[]> => {
    const res = await createRequest({
        url: storeCategoryEndpoint.list,
        method: 'GET'
    });

    return res.data;
}