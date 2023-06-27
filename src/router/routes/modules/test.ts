import type {AppRouteModule} from '/@/router/types';

import {LAYOUT} from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/basic/TestDemo1.vue'),
      meta: {
        title: "测试",
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/basic/TestDemo2.vue'),
      meta: {
        title: "测试2",
      },
    },
  ],
};

export default dashboard;

