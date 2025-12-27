import { Product, ProductDTO } from "@/data";
import { productEndpoint } from "@/endpoints";
import { errorMessage } from "@/utils";
import { createRequest } from "@/utils/createRequest";

export const getProducts = async (): Promise<Product[]> => {
    const res = await createRequest({
        url: productEndpoint.list,
        method: 'GET'
    });

    return res.data;
}

export const addProduct = async (data: ProductDTO) => {
    if (!data.name) throw errorMessage("Name is required");
    if (!data.description) throw errorMessage('Description is required');
    if (!data.priceInCad) throw errorMessage("Price is required");
    if (isNaN(+data.priceInCad)) throw errorMessage('Price must be a valid number');
    if (+data.priceInCad <= 0) throw errorMessage('Price must be greater than 0.00');
    if (!data.featuredPhotoURL) throw errorMessage('Please upload a photo of your product');
    if (data.isNew === undefined || data.isNew === null) throw errorMessage('Please indicate if your product is new or used');
    if (!data.quantity) throw errorMessage('Quantity is required');
    if (isNaN(+data.quantity)) throw errorMessage('Quantity must be a valid number');
    if (!(+data.quantity % 1 === 0)) throw errorMessage('Quanity must be a whole number');
    if (+data.quantity <= 0) throw errorMessage('Quantity must be greater than 0');
    if (!data.category) throw errorMessage('Category is required');
    if (!data.tags) throw errorMessage('Tags is required');
    if (data.tags.length === 0) throw errorMessage('Please enter at least one tag');

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('priceInCad', `${data.priceInCad}`);
    formData.append('featuredPhotoURL', data.featuredPhotoURL[0]);
    formData.append('isNew', data.isNew ? "true" : "false");
    formData.append('quantity', `${data.quantity}`);
    formData.append('category', data.category);
    
    data.tags.forEach(tag => formData.append('tags', tag));
    //Used for single value tags so that it is sent as an array instead of a string
    formData.append('tags', 'trailer');

    const res = await fetch(productEndpoint.create, {
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    const d = await res.json();

    if (res.status === 400 || res.status === 401) {
        throw {
            statusCode: res.status,
            message: d.message
        }
    }

    return true;
}

export const getProductById = async (productId: number): Promise<Product | null> => {
    const res = await createRequest({
        url: productEndpoint.getProduct(productId),
        method: 'GET',
    });
    return res.data;
}

export const getProductsByCity = async (city: string): Promise<Product[]> => {
    const res = await createRequest({
        url: productEndpoint.getProductByCity(city),
        method: "GET"
    });

    return res.data;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await createRequest({
        url: productEndpoint.listAll,
        method: "GET"
    });

    return res.data;
}

export const getPublicProductById = async (productId: number): Promise<Product | null> => {
    const res = await createRequest({
        url: productEndpoint.getPublicProduct(productId),
        method: 'GET'
    });

    return res.data;
}