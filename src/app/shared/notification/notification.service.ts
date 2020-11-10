import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { DialogService } from '../dialog/dialog.service';
import { NotificationConfig } from './notification-config';
import { NotificationConfigType, NotificationConfigTypeCast } from './notification-config-type';
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar, private dialogService: DialogService) { }

  private customShowSnackBar(type: NotificationConfigType, message: string, action?: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action,
      {
        panelClass: NotificationConfigTypeCast.toString(type)
      });
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

  showException(message: string, error: string): MatSnackBarRef<any> {
    const action = 'Details';
    const result = this.customShowSnackBar(NotificationConfigType.error, message, action);
    result.onAction().subscribe(_ => {
      if (action === 'Details') {
        const dialogData = { title: 'Error', description: error, actions: [{ action: 'Ok' }] };
        this.dialogService.showDialog(dialogData);
      }
    });
    return result;
  }

  showNotification(message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, config);
  }

  showApgcNotification(config: NotificationConfig): MatSnackBarRef<any> {
    return this.snackBar.openFromComponent(
      NotificationComponent,
      {
        panelClass: config?.type ? NotificationConfigTypeCast.toString(config.type) : null,
        data: config,
        duration: config?.showCloseButton ? Infinity : config?.duration ?? 2000
      });
  }
}
