import { UserDTO } from "@/data";
import { atom } from "jotai";

export const userAtom = atom<UserDTO | null>(null);