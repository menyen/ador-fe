import { createContext } from 'react';

export interface AlertContextObject {
  text: string;
  type: string;
}

export const AlertContext = createContext<
  [
    alertMessage: AlertContextObject,
    setAlertMessage: React.Dispatch<
      React.SetStateAction<{
        text: string;
        type: string;
      }>
    >
  ]
>([{ text: '', type: 'error' }, () => {}]);
