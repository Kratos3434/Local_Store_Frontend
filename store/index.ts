import { UserDTO } from "@/data";
import { atom } from "jotai";

export const userAtom = atom<UserDTO>({
    userId: -1,
    firstName: "",
    lastName: "",
    email: "",
    createdAt: new Date,
    updatedAt: null
});