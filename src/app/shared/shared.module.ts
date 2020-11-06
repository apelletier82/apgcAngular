import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { AppMenuCategoryItemComponent } from './components/app-menu-category-item/app-menu-category-item.component';
import { FoldersModule } from 'src/app/folders/folders.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';


const components = [
  AppToolbarComponent,
  AppMenuCategoryItemComponent,
  SnackBarComponent
];

const modules = [
  CommonModule,
  HttpClientModule,
  AppMaterialModule,
  AppRoutingModule,
  FoldersModule
];

@NgModule({
  declarations: [... components],
  imports: [... modules],
  exports: [... components]
})
export class SharedModule { }
