import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FoldersModule } from './folders/folders.module';
import { SharedModule } from './shared/shared.module';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { AppMenuComponent } from './app-menu/app-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        AppToolbarComponent,
        AppMenuComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        SharedModule,
        FoldersModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
