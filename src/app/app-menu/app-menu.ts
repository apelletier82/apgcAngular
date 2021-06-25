import AppMenuCategory from './app-menu-category';
import AppMenuItem from './app-menu-item';

export default interface AppMenu {
  home: AppMenuItem;
  categories: AppMenuCategory[];
}
