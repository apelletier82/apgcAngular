import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [DialogComponent],
    imports: [MatDialogModule, MatButtonModule, CommonModule],
    exports: [DialogComponent],
})
export class DialogModule {}
