import { Store, StoreDTO } from "@/data";
import { isValidCity } from "@/data/canada-cities";
import { isValidProvince } from "@/data/canada-province";
import { storeEndpoint } from "@/endpoints"
import { errorMessage, isValidCanadianPostalCode } from "@/utils";
import { createRequest } from "@/utils/createRequest"

export const getStoreProfile = async (token: string): Promise<Store> => {
    const res = await createRequest({
        url: storeEndpoint.profile,
        method: 'GET',
        cookie: token
    });

    return res.data;
}

export const createStore = async (store: StoreDTO) => {
    const {
        name,
        description,
        address,
        category
    } = store;

    if (!name) throw errorMessage("Name is required");
    if (!description) throw errorMessage("Description is required");
    if (!address) throw errorMessage("Address is required");
    if (!address.addressLine1) throw errorMessage("Address line 1 is required");
    if (!address.province) throw errorMessage("Province is required");
    if (!isValidProvince(address.province)) throw errorMessage("Province is invalid");
    if (!address.city) throw errorMessage("City is required");
    if (!isValidCity(address.province, address.city)) throw errorMessage("City is invalid");
    if (!address.postalCode) throw errorMessage("Postal code is required");
    if (!isValidCanadianPostalCode(address.postalCode)) throw errorMessage("Postal code is invalid");
    if (!category) throw errorMessage("Category is required");

    await createRequest({
        method: 'POST',
        body: store,
        url: storeEndpoint.create
    });

    return true;
}