import {PermissionModeEnum} from '../enums/appEnum';
import type {ProjectConfig} from '/#/config';

export const projectSetting: ProjectConfig = {

  useDingLogin: true,

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
