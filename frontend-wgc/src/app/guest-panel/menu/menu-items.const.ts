import { ROUTE } from "../../shared/routes.enum";
import { MenuItem } from "./types/menu.interface";

export const menuItemsData : MenuItem[] = [ 
    {
      targetRoute: ROUTE.HOME,
      label: 'Strona główna',
      isActive: false,
    },
    {
      targetRoute: ROUTE.ADDITIONAL_INFO,
      label: 'Informacje',
      isActive: false,
    },
    {
      targetRoute: ROUTE.INVITE_CONFIRMATION,
      label: 'Potwierdź zaproszenie',
      isActive: false,
    }
  ];