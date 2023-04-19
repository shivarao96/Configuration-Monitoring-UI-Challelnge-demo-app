import { NgModule } from '@angular/core'
import { CommonLoggerComponent } from '../common-views/common-logger/common-logger.component';
import { CommonSearchBarComponent } from '../common-views/common-search-bar/common-search-bar.component';
import { MainSectionComponent } from './main-section.component';
import { HttpClientModule } from '@angular/common/http';
import { MainSectionRoutingModule } from './main-section.routing';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MainSectionComponent,
        CommonLoggerComponent,
        CommonSearchBarComponent
    ],
    imports: [
        HttpClientModule,
        MainSectionRoutingModule,
        CommonModule,
    ],
    exports: [
    ]
})
export class MainSectionModule {}