import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainSectionComponent } from "./main-section.component";


const routes : Routes = [
    {
        path: '',
        component: MainSectionComponent,
        children: [
            {
                path: 'configuration',
                loadChildren: () => import('../configuration/configuration.module').then(e=>e.ConfigurationModule)
            },
            {
                path: 'user',
                loadChildren: () => import('../user/user.module').then(e=>e.UserModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainSectionRoutingModule {}