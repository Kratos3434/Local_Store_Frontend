import { UserDTO } from "@/data";
import { userEndpoint } from "@/endpoints";
import { createRequest } from "@/utils/createRequest";

export const getProfile = async (token: string): Promise<UserDTO> => {
    const res = await createRequest({
        url: userEndpoint.profile,
        cookie: token,
        method: 'GET',
    });

    return res.data;
}