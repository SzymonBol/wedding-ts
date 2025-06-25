import { ROUTE } from "../../shared/routes.enum";
import { MenuItem } from "./types/menu.interface";

export const menuItemsData : MenuItem[] = [ 
    {
      targetRoute: ROUTE.HOME,
      label: 'Strona główna',
      isActive: false,
    },
    {
      targetRoute: ROUTE.ENTER_CODE,
      label: 'Potwierdź zaproszenie',
      isActive: false,
    },
    {
      targetRoute: ROUTE.SINGBOOK,
      label: 'Śpiewnik',
      isActive: false,
    },
    {
      targetRoute: 'https://drive.google.com/drive/folders/1eL4tdma8yzJykF2I-pdWK5RxD1rgcK8i?usp=drive_link',
      label: 'Wasze zdjęcia',
      isActive: false,
      external: true,
      externalConfrimation: {
        header: 'Wasze zdjęcia',
        text: "Udostępniamy Wam folder na dysku Google, gdzie możecie podzielić się zdjęciami z Waszych przygotowań do wesela oraz z samej imprezy. Czy chcesz go teraz otworzyć?"
      }
    }
  ];
 