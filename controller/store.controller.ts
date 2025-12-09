import { Store } from "@/data";
import { storeEndpoint } from "@/endpoints"
import { createRequest } from "@/utils/createRequest"

export const getStoreProfile = async (token: string): Promise<Store> => {
    const res = await createRequest({
        url: storeEndpoint.profile,
        method: 'GET',
        cookie: token
    });

    return res.data;
}