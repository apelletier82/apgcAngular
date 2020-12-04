import { DialogAction } from './dialog-action';

export interface DialogData {
  title?: string;
  description: string;
  actions?: DialogAction[];
}
