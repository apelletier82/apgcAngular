import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FoldersRoutingModule } from './folders-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { FolderSelectionComponent } from './folder-selection/folder-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderComponent } from './folder/folder.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FolderSelectionComponent,
    FolderListComponent,
    FolderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FoldersRoutingModule,
    AppMaterialModule,
    SharedModule,
  ],
  exports: [],
  entryComponents: [FolderSelectionComponent],
})
export class FoldersModule {}
