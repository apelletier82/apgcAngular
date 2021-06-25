import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import DialogComponent from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  exports: [DialogComponent],
})
export default class DialogModule {}
