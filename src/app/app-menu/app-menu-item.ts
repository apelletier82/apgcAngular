export default interface AppMenuItem {
  id: number;
  caption: string;
  icon?: string;
  fas?: boolean;
  routerLink: string;
  checkVisibility?: boolean;
}
