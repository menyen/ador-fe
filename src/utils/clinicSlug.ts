import { createContext } from 'react';

export const ClinicSlugContext = createContext<
  [clinicSlug: string, setClinicSlug: (clinicSlug: string) => void]
>(['', () => {}]);
