import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMenuCategoryItemComponent } from './app-menu-category-item.component';
import { AppMaterialModule} from '../app-material.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    AppMenuCategoryItemComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  exports: [
    AppMenuCategoryItemComponent
  ]
})
export class AppMenuCategoryItemModule { }
