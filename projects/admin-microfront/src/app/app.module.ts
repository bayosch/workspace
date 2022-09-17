import { Injector,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AdminComponent],
  imports: [BrowserModule, HttpClientModule,NgbModule],
  exports: [
    AdminComponent
  ],
  providers: []
})
export class AppModule {
  constructor(
    private injector: Injector
  ) { }

  ngDoBootstrap() {
    const weathercomponent = createCustomElement(AdminComponent, {injector: this.injector});
    customElements.define('app-admin', weathercomponent);
  }
}
