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
      targetRoute: 'https://drive.google.com/drive/folders/1eL4tdma8yzJykF2I-pdWK5RxD1rgcK8i?usp=drive_link',
      label: 'Wasze zdjęcia',
      isActive: false,
      external: true
    }
  ];
 