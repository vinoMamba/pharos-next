import {PermissionModeEnum} from '../enums/appEnum';
import type {ProjectConfig} from '/#/config';

// ! You need to clear the browser cache after the change
export const projectSetting: ProjectConfig = {
  // Use error-handler-plugin
  useErrorHandle: false,
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  transitionSetting: {
    enable: true,
    basicTransition: 'fade-transform',
    openPageLoading: true,
    openNProgress: false
  },
  menuSetting: {
    // Menu collapse
    collapsed: false,
    // Menu width
    menuWidth: 210,
  }
};
