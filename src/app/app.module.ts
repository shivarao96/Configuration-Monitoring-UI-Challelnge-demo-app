import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { LoggerConsoleModule } from './views/logger-console/logger-console.module';
import { CommonThrobberComponent } from './views/common-views/common-throbber/common-throbber.component';
import { LoadingInterceptor } from './interceptors/throbber';
import { CommonToasterComponent } from './views/common-views/common-toaster/common-toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonThrobberComponent,
    CommonToasterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    LoggerConsoleModule
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
