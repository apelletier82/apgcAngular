import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FoldersRoutingModule } from './folders-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { FolderSelectionComponent } from './folder-selection/folder-selection.component';
import { FOLDER_API_URL } from 'src/api/api-config';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [    
    FolderSelectionComponent
  ],
  imports: [
    CommonModule, 
    HttpClientModule,   
    FormsModule,
    FoldersRoutingModule,
    AppMaterialModule   
  ],
  providers: [
    { provide: FOLDER_API_URL, useValue: FOLDER_API_URL }
  ],
  entryComponents:[
    FolderSelectionComponent
  ]
})
export class FoldersModule { }
