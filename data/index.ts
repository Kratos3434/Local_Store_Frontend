export interface ResponsePayload {
    status: boolean;
    statusCode: number;
    data: any;
    message: string;
};

export interface SignupDTO {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    password2: string
}

export const USER_SESSION_TOKEN = "USER_SESSION_TOKEN";
export const USER_VERIFY_TOKEN = "USER_VERIFY_TOKEN";

export const SELLER_SESSION_TOKEN = "SELLER_SESSION_TOKEN";
export const SELLER_VERIFY_TOKEN = "SELLER_VERIFY_TOKEN";

export interface UserDTO {
    firstName: string;
    lastName: string;
    userId: number;
    email: string;
    createdAt: Date;
    updatedAt: Date | null;
};

export interface Store {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    name: string;
    description: string;
    profilePictureURL: string;
    backgroundPictureURL: string;
    categoryId: number;
    sellerId: number;
};

export interface Seller {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    sellerId: number;
    firstName: string;
    lastName: string;
};