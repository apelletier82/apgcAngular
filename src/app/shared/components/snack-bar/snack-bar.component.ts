import { SplitInterpolation } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarConfig } from './snack-bar-config';
import { SnackBarConfigType } from './snack-bar-config-type';

@Component({
  selector: 'apgc-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  private readonly snackBarContainerCssClass = 'snack-bar-container';

  get cssClass(): string {
    const result = this.getSnackBarModelTypeName(this.data?.type);
    return this.snackBarContainerCssClass.concat(' ').concat(result).trim();
  }

  private getSnackBarModelTypeName(snackBarType: SnackBarConfigType): string {
    let result = '';

    if (snackBarType) {
      try {
        result = SnackBarConfigType[snackBarType];
      }
      catch {
        result = '';
      }
    }
    return result;
  }

  constructor(
    private snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarConfig)
  { }

  ngOnInit(): void {
  }

  close() {
    this.snackBarRef.dismiss();
  }
  onActionClick() {
    this.snackBarRef.dismissWithAction();
  }
}
