import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoute: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    // { path: 'shopping-list', loadChildren: ()=> import('./shopping-list/shopping-list.module').then(mod=>mod.ShoppingListModule) }
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute, {preloadingStrategy:PreloadAllModules})
        // RouterModule.forRoot(appRoute, {useHash:true })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }