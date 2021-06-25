import DialogAction from './dialog-action';

export default interface DialogData {
  title?: string;
  description: string;
  actions?: DialogAction[];
}
