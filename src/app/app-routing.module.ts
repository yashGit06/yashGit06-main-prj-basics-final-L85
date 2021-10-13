import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoute: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent,
        children : [
            {path:'',component: RecipeStartComponent},
            {path:':id',component: RecipesComponent}
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
        // RouterModule.forRoot(appRoute, {useHash:true })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }