import { Routes } from "@angular/router";
import { SoftwareLicenseCategoryList } from "./software-license-category-list/software-license-category-list";
import { SoftwareLicenseCategoryAdd } from "./software-license-category-add/software-license-category-add";
import { SoftwareLicenseCategoryEdit } from "./software-license-category-edit/software-license-category-edit";

export const SOFTWARELINCCATEGORY_ROUTE : Routes = [

    {
        path:"", component:SoftwareLicenseCategoryList
    },
    {
        path:'add', component:SoftwareLicenseCategoryAdd
    },
    {
        path:'update/:id', component:SoftwareLicenseCategoryEdit
    }

]