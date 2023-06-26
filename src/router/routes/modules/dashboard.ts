import {LAYOUT} from '../../constant';
import type {AppRouteModule} from '/@/router/types';

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '首页',
  },
  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('/@/views/basic/home/HomePage.vue'),
      meta: {
        title: '首页',
      }
    }
  ]
};

export default home;
