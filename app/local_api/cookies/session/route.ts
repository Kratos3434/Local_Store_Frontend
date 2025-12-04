import { USER_SESSION_TOKEN } from "@/data";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    const cookieStore = cookies();

    (await cookieStore).delete(USER_SESSION_TOKEN);

    const res = NextResponse.json({message: 'User logged out successfully'});

    res.cookies.set(USER_SESSION_TOKEN, '', {
        expires: new Date(0),
        path: '/'
    });

    return res;
}