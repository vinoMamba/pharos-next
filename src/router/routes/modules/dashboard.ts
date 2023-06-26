import type {AppRouteModule} from '/@/router/types';

const dashboard: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: () => import('/@/views/basic/home/HomePage.vue'),
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '首页',
  },
};

export default dashboard;
