import type {Menu} from '/@/router/types';
import {watch, ref} from 'vue';
import {getMenus} from '/@/router/menus';
import {usePermissionStore} from '/@/store/modules/permission';

export function useLayoutMenu() {
  // Menu array
  const menusRef = ref<Menu[]>([]);
  const permissionStore = usePermissionStore();
  // Menu changes
  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    async () => {
      menusRef.value = await getMenus();
    },
    {
      immediate: true,
    },
  );
  return {menusRef};
}

