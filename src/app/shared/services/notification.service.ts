import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationConfig } from '../models/notification-config';
import { NotificationConfigType } from '../models/notification-config-type';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  getSnackBarTypeName(snackBarType: NotificationConfigType): string {
    const result: string = NotificationConfigType[snackBarType];
    return result;
  }

  private customShowSnackBar(type: NotificationConfigType, message: string, action?: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, { panelClass: this.getSnackBarTypeName(type) });
  }

  showInformation(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(NotificationConfigType.information, message, action);
  }

  showSuccess(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(NotificationConfigType.success, message, action);
  }

  showWarning(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(NotificationConfigType.warning, message, action);
  }

  showError(message: string, action?: string): MatSnackBarRef<any> {
    return this.customShowSnackBar(NotificationConfigType.error, message, action);
  }

  showSnackBar(message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, config);
  }

  showApgcSnackBar(config: NotificationConfig): MatSnackBarRef<any> {
    return this.snackBar.openFromComponent(
      SnackBarComponent,
      {
        panelClass: config?.type ? this.getSnackBarTypeName(config.type) : null,
        data: config,
        duration: config?.showCloseButton ? Infinity : config?.duration ?? 2000
      });
  }
}
