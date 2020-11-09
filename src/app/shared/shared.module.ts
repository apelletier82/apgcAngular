import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { AppMenuCategoryItemComponent } from './components/app-menu-category-item/app-menu-category-item.component';
import { FoldersModule } from 'src/app/folders/folders.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './notification/notification.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogModule } from './dialog/dialog.module';
import { NotificationModule } from './notification/notification.module';


const components = [
  AppToolbarComponent,
  AppMenuCategoryItemComponent
];

const modules = [
  CommonModule,
  HttpClientModule,
  AppMaterialModule,
  AppRoutingModule,
  DialogModule,
  NotificationModule,
  FoldersModule
];

@NgModule({
  declarations: [... components],
  imports: [... modules],
  exports: [... components]
})
export class SharedModule { }
