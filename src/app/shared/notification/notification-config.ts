import { TemplateRef } from '@angular/core';
import { NotificationConfigType } from './notification-config-type';

export interface NotificationConfig {
  type?: NotificationConfigType;
  message?: string;
  template?: TemplateRef<any>;
  action?: string;
  icon?: string;
  iconFas?: boolean;
  showCloseButton?: boolean;
  duration?: number;
}
