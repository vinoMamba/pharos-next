import type {Router} from 'vue-router';
import {useAppStore} from '/@/store/modules/app';
import {useUserStore} from '/@/store/modules/user';
import {usePermissionStore} from '/@/store/modules/permission';
import {PageEnum} from '/@/enums/pageEnum';
import {removeTabChangeListener} from '/@/utils/router';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === PageEnum.BASE_LOGIN) {
      const userStore = useUserStore();
      const appStore = useAppStore();
      const permissionStore = usePermissionStore();
      appStore.resetAllState();
      permissionStore.resetState();
      userStore.resetState();
      removeTabChangeListener();
    }
  });
}
