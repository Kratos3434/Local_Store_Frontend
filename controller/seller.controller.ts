import { Seller } from "@/data";
import { sellerEndpoint } from "@/endpoints"
import { createRequest } from "@/utils/createRequest"

export const getSellerProfile = async (token: string): Promise<Seller> => {
    const res = await createRequest({
        url: sellerEndpoint.profile,
        method: 'GET',
        cookie: token
    });

    return res.data;
}