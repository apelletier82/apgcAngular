import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppMenuCategoryItemModule } from './app-menu-category-item/app-menu-category-item.module';
import { AppToolbarModule } from './app-toolbar/app-toolbar.module';
import { FoldersModule } from './folders/folders.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppMaterialModule,
    AppMenuCategoryItemModule,
    AppToolbarModule,
    FoldersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
