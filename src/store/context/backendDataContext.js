import { createContext } from "react";

export const BackendDataContext = createContext({
    value: null,
    setValue: () => {}
})