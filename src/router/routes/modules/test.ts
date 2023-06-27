import type {AppRouteModule} from '/@/router/types';

import {LAYOUT} from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'i-mdi-alarm-bell',
    title: 'dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/basic/TestDemo1.vue'),
      meta: {
        title: "测试",
        icon: 'i-mdi-alarm',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/basic/TestDemo2.vue'),
      meta: {
        title: "测试2",
        icon: 'i-mdi-alarm',
      },
    },
  ],
};

export default dashboard;

