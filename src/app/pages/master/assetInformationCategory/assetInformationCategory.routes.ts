import { Routes } from "@angular/router";
import { AssetInformationCategoryAdd } from "./asset-information-category-add/asset-information-category-add";
import { AssetInformationCategoryList } from "./asset-information-category-list/asset-information-category-list";
import { AssetInformationCategoryEdit } from "./asset-information-category-edit/asset-information-category-edit";

export const ASSETINFOCATEGORY_ROUTE : Routes = [

    {
        path:'', component:AssetInformationCategoryList,
    },
    {
        path:"add", component:AssetInformationCategoryAdd
    },
    {
        path:'update/:id', component:AssetInformationCategoryEdit
    }

]