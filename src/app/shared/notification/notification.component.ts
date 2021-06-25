import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import NotificationConfigTypeCast from './notification-config-type-helper';
import NotificationConfig from './notification-config';

@Component({
  selector: 'apgc-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export default class NotificationComponent {
  private readonly notificationContainerCssClass = 'notification-container';

  get cssClass(): string {
    const result = NotificationConfigTypeCast.toString(this.data?.type);
    return this.notificationContainerCssClass.concat(' ').concat(result).trim();
  }

  constructor(
    private snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationConfig,
  ) {}

  close(): void {
    this.snackBarRef.dismiss();
  }

  onActionClick(): void {
    this.snackBarRef.dismissWithAction();
  }
}
