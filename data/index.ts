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

export interface UserDTO {
    firstName: string;
    lastName: string;
    userId: number;
    email: string;
    createdAt: Date;
    updatedAt: Date | null;
};