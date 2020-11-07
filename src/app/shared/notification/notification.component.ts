import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationConfig } from './notification-config';
import { NotificationConfigTypeCast } from './notification-config-type';

@Component({
  selector: 'apgc-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  private readonly notificationContainerCssClass = 'notification-container';

  get cssClass(): string {
    const result = NotificationConfigTypeCast.toString(this.data?.type);
    return this.notificationContainerCssClass.concat(' ').concat(result).trim();
  }

  constructor(
    private snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationConfig)
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
