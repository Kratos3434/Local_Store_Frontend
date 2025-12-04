import { ResponsePayload } from "@/data";

export const createRequest = async ({
    url,
    method,
    contentType = "application/json",
    body,
    cookie
}: {
    url: string,
    method: string,
    contentType?: string,
    body?: any,
    cookie?: string
}): Promise<ResponsePayload> => {
    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': contentType,
            "Cookie": `${cookie}`
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : null
    });

    const data = await res.json();

    if (res.status === 400 || res.status === 401) {
        throw {
            statusCode: res.status,
            message: data.message
        }
    }

    return data;
}