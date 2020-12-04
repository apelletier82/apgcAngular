import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FoldersModule } from 'src/app/folders/folders.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from './dialog/dialog.module';
import { NotificationModule } from './notification/notification.module';
import { MenuIconCaptionComponent } from './components/menu-icon-caption/menu-icon-caption.component';

const components = [MenuIconCaptionComponent];

const modules = [
  CommonModule,
  HttpClientModule,
  AppMaterialModule,
  AppRoutingModule,
  DialogModule,
  NotificationModule,
  FoldersModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class SharedModule {}
