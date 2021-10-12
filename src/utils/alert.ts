import { createContext } from "react";
  
export const AlertContext = createContext<[alertMessage: string, setAlertMessage: (message: string) => void]>(['', () => {}]);