import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppToolbarComponent } from './app-toolbar.component';
import { AppMaterialModule } from '../app-material.module';



@NgModule({
  declarations: [AppToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule
  ],
  exports:[
    AppToolbarComponent
  ]
})
export class AppToolbarModule { }
