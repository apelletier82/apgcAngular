import AppMenuItem from './app-menu-item';

export default interface AppMenuCategory {
  id: number;
  caption: string;
  icon?: string;
  fas?: boolean;
  items: AppMenuItem[];
  checkVisibility?: boolean;
}
