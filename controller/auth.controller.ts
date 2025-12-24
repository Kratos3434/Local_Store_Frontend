import { SignupDTO } from "@/data";
import { isValidCity } from "@/data/canada-cities";
import { isValidProvince } from "@/data/canada-province";
import { authEndpoint } from "@/endpoints";
import { errorMessage, isValidEmail } from "@/utils";
import { createRequest } from "@/utils/createRequest";

export const signin = async (email: string, password: string) => {
    if (!email) throw errorMessage("email is required");
    if (!isValidEmail(email)) throw errorMessage("invalid email");
    if (!password) throw errorMessage("password is required");

    await createRequest({
        url: authEndpoint.signin,
        method: 'POST',
        body: { email, password }
    });

    return true;
}

export const signup = async (data: SignupDTO) => {
    const { email, firstName, lastName, password, password2, city, province } = data;

    if (!email) throw errorMessage("email is required");
    if (!isValidEmail(email)) throw errorMessage("invalid email");
    if (!firstName) throw errorMessage("first name is required");
    if (!lastName) throw errorMessage("last name is required");
    if (!province) throw errorMessage('Province is required');
    if (!isValidProvince(province)) throw errorMessage('Province is not valid');
    if (!city) throw errorMessage('City is required');
    if (!isValidCity(province, city)) throw errorMessage(`${city} is not a valid city of ${province}`);
    if (!password) throw errorMessage("password is required");
    if (!password2) throw errorMessage("please confirm your password");
    if (password !== password2) throw errorMessage("passwords do not match");

    await createRequest({
        url: authEndpoint.signup,
        method: 'POST',
        body: {
            email,
            firstName,
            lastName,
            password,
            password2,
            city,
            province
        }
    });

    return true;
}

export const authenticateVerifyToken = async (token: string) => {
    const res = await createRequest({
        url: authEndpoint.authenticateVerifyToken,
        method: 'GET',
        cookie: token
    });

    return res.data.email;
}

export const verifyUser = async (otp: string) => {
    if (!otp) throw errorMessage("Otp is required");

    await createRequest({
        url: authEndpoint.verifyOtp(otp),
        method: 'PUT'
    });

    return true;
}

export const sendOtp = async () => {
    const res = await createRequest({
        url: authEndpoint.sendOtp,
        method: 'PUT'
    });

    return res.message;
}

export const sellerSignin = async (email: string, password: string) => {
    if (!email) throw errorMessage("email is required");
    if (!isValidEmail(email)) throw errorMessage("invalid email");
    if (!password) throw errorMessage("password is required");

    await createRequest({
        url: authEndpoint.sellerSignin,
        method: 'POST',
        body: { email, password }
    });

    return true;
}

export const sellerSignup = async (data: SignupDTO) => {
    const { email, firstName, lastName, password, password2 } = data;

    if (!email) throw errorMessage("email is required");
    if (!isValidEmail(email)) throw errorMessage("invalid email");
    if (!firstName) throw errorMessage("first name is required");
    if (!lastName) throw errorMessage("last name is required");
    if (!password) throw errorMessage("password is required");
    if (!password2) throw errorMessage("please confirm your password");
    if (password !== password2) throw errorMessage("passwords do not match");

    await createRequest({
        url: authEndpoint.sellerSignup,
        method: 'POST',
        body: {
            email,
            firstName,
            lastName,
            password,
            password2
        }
    });

    return true;
}

export const authenticateSellerVerifyToken = async (token: string) => {
    const res = await createRequest({
        url: authEndpoint.authenticateSellerVerifyToken,
        method: 'GET',
        cookie: token
    });

    return res.data.email;
}

export const verifySeller = async (otp: string) => {
    if (!otp) throw errorMessage("Otp is required");

    await createRequest({
        url: authEndpoint.verifySellerOtp(otp),
        method: 'PUT'
    });

    return true;
}

export const sendSellerOtp = async () => {
    const res = await createRequest({
        url: authEndpoint.sellerSendOtp,
        method: 'PUT'
    });

    return res.message;
}