import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesSolverService } from "./recipes-solver.service";
import { RecipesComponent } from "./recipes.component";

const appRoute: Routes = [
    { path: 'recipes', component: RecipesComponent, canActivate:[AuthGuard],
        children : [
            {path:'',component: RecipeStartComponent},
            {path:'new', component : RecipeEditComponent},
            {path:':id',component: RecipeDetailComponent, resolve:[RecipesSolverService]},
            {path:':id/edit', component : RecipeEditComponent, resolve:[RecipesSolverService]}
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(appRoute)],
    exports:[RouterModule]
})

export class RecipesRoutingModule {}