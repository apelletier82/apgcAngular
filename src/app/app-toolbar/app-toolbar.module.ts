import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppToolbarComponent } from './app-toolbar.component';
import { AppMaterialModule } from '../app-material.module';
import { FoldersModule } from '../folders/folders.module';



@NgModule({
  declarations: [AppToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FoldersModule
  ],
  exports:[
    AppToolbarComponent
  ],
  entryComponents:[
    
  ]
})
export class AppToolbarModule { }
