import { Routes } from "@angular/router";
import { MenusList } from "./menus-list/menus-list";
import { MenusAdd } from "./menus-add/menus-add";
import { MenusEdit } from "./menus-edit/menus-edit";

export const MENU_ROUTES: Routes = [

    {
        path:'', component:MenusList
    },
    {
        path:'add', component:MenusAdd
    },
    {
        path:'edit/:id', component:MenusEdit
    }

]