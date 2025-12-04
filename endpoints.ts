const baseUrl = "https://local-store-backend-black.vercel.app/dev";

const authBaseUrl = `/server/auth`;

export const authEndpoint = {
    signin: `${authBaseUrl}/signin`,
    signup: `${authBaseUrl}/signup`,
    verifyOtp: (otp: string) => `${authBaseUrl}/verify/${otp}` ,
    sendOtp: `${authBaseUrl}/send-otp`,
    authenticateVerifyToken: `${baseUrl}/auth/authenticate/verify-token`,
    authenticateSessionToken: `${baseUrl}/auth/authenticate/session-token`
};