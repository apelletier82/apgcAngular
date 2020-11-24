import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FoldersRoutingModule } from './folders-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { FolderSelectionComponent } from './folder-selection/folder-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { FolderListComponent } from './folder-list/folder-list.component';
import { FolderComponent } from './folder/folder.component';

@NgModule({
    declarations: [FolderSelectionComponent, FolderListComponent, FolderComponent],
    imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FoldersRoutingModule, AppMaterialModule],
    entryComponents: [FolderSelectionComponent],
})
export class FoldersModule {}
