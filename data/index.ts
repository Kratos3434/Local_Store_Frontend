import { Dayjs } from "dayjs";

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
    password2: string,
    city: string,
    province: string,
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
    city: string;
    province: string;
};

export interface User {
    id: number;
    email: string;
    profile: User_Profile;
};

export interface User_Profile {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    userId: number;
    firstName: string;
    lastName: string;
}

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

export interface StoreDTO {
    name: string;
    description: string;
    address: Store_AddressDTO;
    category: string;
};

export interface Store_AddressDTO {
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
};

export interface Store_Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
};

export interface ProductDTO {
    name: string;
    description: string;
    priceInCad: number;
    isNew: boolean;
    featuredPhotoURL: FileList;
    isMeetUpOnly: boolean;
    quantity: number;
    category: string;
    tags: string[];
};

export interface Product {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    name: string;
    description: string;
    categoryId: number;
    storeId: number;
    priceInCad: number;
    quantity: number;
    featuredPhotoURL: string;
    isMeetUpOnly: boolean;
    isNew: boolean;
    category: Product_Category;
    tags: Product_Tag;
    store: Store;
};

export interface Product_Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
};

interface Product_Tag {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    productId: number;
};

export interface Create_Order {
    productId: number;
    preferredMeetingPlace: string;
    notes: string | null;
    preferredMeetupDate: Date;
    contactNumber: string;
    quantity: number;
};

export interface Order {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    storeId: number;
    productId: number;
    userId: number;
    statusId: number;
    product: Product;
    user: User;
    details: Order_Details;
    status: Order_Status;
    amount: number;
    amountAfterTax: number;
    type: string;
}

interface Order_Details {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    quantity: number;
    contactNumber: string;
    preferredMeetingPlace: string;
    preferredMeetupDate: Date;
    notes: string | null;
    orderId: number;
};

interface Order_Status {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    status: string;
}

export enum EOrder_Status {
    PENDING = "Pending",
    COMPLETE = "Complete",
    CANCELLED = "Cancelled",
    NO_SHOW = "No Show",
    ACCEPTED = "Accepted",
    DECLINED = "Declined",
    SHIPPED = "Shipped"
};