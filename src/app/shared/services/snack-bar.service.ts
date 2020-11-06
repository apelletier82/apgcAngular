import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarConfig } from '../components/snack-bar/snack-bar-config';
import { SnackBarConfigType } from '../components/snack-bar/snack-bar-config-type';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  getSnackBarTypeName(snackBarType: SnackBarConfigType): string {
    const result: string = SnackBarConfigType[snackBarType];
    return result;
  }

  private customShowSnackBar(type: SnackBarConfigType, message: string, action?: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, { panelClass: this.getSnackBarTypeName(type) });
  }

  showInformation(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(SnackBarConfigType.information, message, action);
  }

  showSuccess(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(SnackBarConfigType.success, message, action);
  }

  showWarning(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(SnackBarConfigType.warning, message, action);
  }

  showError(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(SnackBarConfigType.error, message, action);
  }

  showSnackBar(message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, config);
  }

  showApgcSnackBar(config: SnackBarConfig): MatSnackBarRef<any> {
    return this.snackBar.openFromComponent(
      SnackBarComponent,
      {
        panelClass: config?.type ? this.getSnackBarTypeName(config.type) : null,
        data: config,
        duration: config?.showCloseButton ? Infinity : config?.duration ?? 2000
      });
  }
}
