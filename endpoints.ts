const baseUrl = "https://local-store-backend-black.vercel.app/dev";
const localBaseUrl = "http://localhost:8080/dev";

const authBaseUrl = `/server/auth`;

export const authEndpoint = {
    signin: `${authBaseUrl}/signin`,
    signup: `${authBaseUrl}/signup`,
    verifyOtp: (otp: string) => `${authBaseUrl}/verify/${otp}` ,
    sendOtp: `${authBaseUrl}/send-otp`,
    authenticateVerifyToken: `${baseUrl}/auth/authenticate/verify-token`,
    authenticateSessionToken: `${baseUrl}/auth/authenticate/session-token`
};

const userBaseUrl = `${localBaseUrl}/user`;

export const userEndpoint = {
    profile: `${baseUrl}/user/profile`
};