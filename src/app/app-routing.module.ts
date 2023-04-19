import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes : Routes = [
    {
        path: '',
        loadChildren: () => import('./views/main-section/main-section.module').then((e) => e.MainSectionModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', initialNavigation: 'enabledBlocking'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}