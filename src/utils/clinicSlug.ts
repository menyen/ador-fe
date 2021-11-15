import { createContext } from 'react';

export const ClinicSlugContext = createContext<
  [alertMessage: string, setAlertMessage: (message: string) => void]
>(['', () => {}]);
