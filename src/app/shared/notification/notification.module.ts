import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import NotificationComponent from './notification.component';
import DialogModule from '../dialog/dialog.module';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    DialogModule,
  ],
  exports: [NotificationComponent],
})
export default class NotificationModule {}
