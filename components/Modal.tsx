'use client'

const Modal = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="w-full h-dvh bg-[rgba(0,0,0,0.5)] flex justify-center items-center fixed top-0 left-0 px-2">
            {children}
        </div>
    )
}

export default Modal;