import { TemplateRef } from '@angular/core';
import { SnackBarConfigType } from './snack-bar-config-type';

export interface SnackBarConfig {
    type?: SnackBarConfigType;
    message?: string;
    template?: TemplateRef<any>;
    action?: string;
    icon?: string;
    iconFas?: boolean;
    showCloseButton?: boolean;
    duration?: number;
}
