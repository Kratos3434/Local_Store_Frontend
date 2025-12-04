'use client'

import { CircularProgress } from "@mui/material"

const SubmitButton = ({loading, title}: {loading: boolean, title: string}) => {
    return (
        <button className={`flex items-center bg-blue-600 py-2 px-4 rounded-md font-bold text-lg hover:brightness-95 gap-3 ${loading ? "cursor-not-allowed" : "cursor-pointer"} text-white`} disabled={loading}>
            <p>
                {title}
            </p>
            {loading && <CircularProgress size={20} color="inherit" />}
        </button>
    )
}

export default SubmitButton;