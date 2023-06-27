import {useAppStore} from "../store/modules/app"
import type {MenuSetting, ProjectConfig} from "/#/config";
import {computed} from "vue";

export const useMenuSetting = () => {
  const appStore = useAppStore()

  const collapsed = computed(() => appStore.getMenuSetting.collapsed)
  const menuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({menuSetting} as ProjectConfig);
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !appStore.getMenuSetting.collapsed,
    });
  }


  return {
    collapsed,
    menuWidth,
    toggleCollapsed
  }
}
