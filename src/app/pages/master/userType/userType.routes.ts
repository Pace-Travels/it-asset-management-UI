import { Routes } from "@angular/router";
import { UserTypeList } from "./user-type-list/user-type-list";
import { UserTypeEdit } from "./user-type-edit/user-type-edit";

export const USERTYPE_ROUTE : Routes = [
    
    {
        path:'', component:UserTypeList
    },
    {
        path:'add', component:UserTypeEdit
    },
    {
        path:'update/:id', component:UserTypeEdit
    }

]