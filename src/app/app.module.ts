import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainSectionComponent } from './views/main-section/main-section.component';
import { UserComponent } from './views/user/user.component';
import { ConfigurationComponent } from './views/configuration/configuration.component';
import { CommonLoggerComponent } from './views/common-views/common-logger/common-logger.component';
import { CommonSearchBarComponent } from './views/common-views/common-search-bar/common-search-bar.component';
import { CommonToasterComponent } from './views/common-views/common-toaster/common-toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    MainSectionComponent,
    UserComponent,
    ConfigurationComponent,
    CommonLoggerComponent,
    CommonSearchBarComponent,
    CommonToasterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
