import { SELLER_VERIFY_TOKEN } from "@/data";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    const cookieStore = cookies();

    (await cookieStore).delete(SELLER_VERIFY_TOKEN);

    const res = NextResponse.json({message: 'User verified'});

    res.cookies.set(SELLER_VERIFY_TOKEN, '', {
        expires: new Date(0),
        path: '/'
    });

    return res;
}