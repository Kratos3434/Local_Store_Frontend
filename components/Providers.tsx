'use client'

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import SignupNow from "./SignupNow";
import { useAtomValue } from "jotai";
import { openSignupBannerAtom } from "@/store";

const Providers = ({children}: {children: React.ReactNode}) => {
    const [client] = useState(new QueryClient());
    const openSignupBanner = useAtomValue(openSignupBannerAtom);

    return (
        <QueryClientProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {children}
                {openSignupBanner && <SignupNow />}
            </LocalizationProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default Providers;