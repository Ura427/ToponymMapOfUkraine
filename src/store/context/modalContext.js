import { createContext } from "react";

export const ModalContext = createContext({
  value: {
    open: false,
    title: null,
    desc: null,
  },
  setValue: () => {},
});
