import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppMenuCategoryItemModule } from './app-menu-category-item/app-menu-category-item.module';
import { AppToolbarModule } from './app-toolbar/app-toolbar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppMenuCategoryItemModule,
    AppToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
