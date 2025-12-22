const baseUrl = "https://local-store-backend-black.vercel.app/dev";
const localBaseUrl = "http://localhost:8080/dev";

const authBaseUrl = `/server/auth`;

export const authEndpoint = {
    signin: `${authBaseUrl}/signin`,
    signup: `${authBaseUrl}/signup`,
    verifyOtp: (otp: string) => `${authBaseUrl}/verify/${otp}` ,
    sendOtp: `${authBaseUrl}/send-otp`,
    authenticateVerifyToken: `${baseUrl}/auth/authenticate/verify-token`,
    authenticateSessionToken: `${baseUrl}/auth/authenticate/session-token`,
    sellerSignin: `${authBaseUrl}/seller/signin`,
    sellerSignup: `${authBaseUrl}/seller/signup`,
    verifySellerOtp: (otp: string) => `${authBaseUrl}/seller/verify/${otp}`,
    sellerSendOtp: `${authBaseUrl}/seller/send-otp`,
    authenticateSellerVerifyToken: `${baseUrl}/auth/authenticate/seller-verify-token`
};

const userBaseUrl = `${baseUrl}/user`;

export const userEndpoint = {
    profile: `${baseUrl}/user/profile`
};

const sellerBaseUrl = `${baseUrl}/seller`;

export const sellerEndpoint = {
    profile: `${baseUrl}/seller/profile`
};

const storeBaseUrl = `/server/store`;

export const storeEndpoint = {
    profile: `${baseUrl}/store/`,
    create: `${storeBaseUrl}/create`
}

const storeCategoryBaseUrl = `/server/store-category`;

export const storeCategoryEndpoint = {
    list: `${storeCategoryBaseUrl}/list`
}

const productBaseUrl = `/server/product`;

export const productEndpoint = {
    list: `${productBaseUrl}/list`,
    getProduct: (productId: number) => `${localBaseUrl}/product/list/${productId}`,
    create: `${productBaseUrl}/create`,
}

const productCategoryBaseUrl = `/server/product-category`;

export const productCategoryEndpoint = {
    list: `${productCategoryBaseUrl}/list`,
}