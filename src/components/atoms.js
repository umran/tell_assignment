import { atom } from "recoil"

export const todoState = atom({
    key: "todoState",
    default: []
})

export const todoFilterState = atom({
    key: "todoFilterState",
    default: "All"
})