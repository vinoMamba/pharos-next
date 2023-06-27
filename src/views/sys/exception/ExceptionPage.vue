<script lang="tsx">
import type {PropType} from 'vue';
import {Result, Button} from 'ant-design-vue';
import {defineComponent, ref, computed, unref} from 'vue';
import {ExceptionEnum} from '/@/enums/exceptionEnum';
import notDataSvg from '/@/assets/svg/no-data.svg';
import netWorkSvg from '/@/assets/svg/net-error.svg';
import {useRoute} from 'vue-router';
import {PageEnum} from '/@/enums/pageEnum';
import {useGo} from '/@/hooks/usePage';

interface MapValue {
  title: string;
  subTitle: string;
  btnText?: string;
  icon?: string;
  handler?: any;
  status?: string;
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },

    title: {
      type: String as PropType<string>,
      default: '',
    },

    subTitle: {
      type: String as PropType<string>,
      default: '',
    },

    full: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const go = useGo()
    const statusMapRef = ref(new Map<string | number, MapValue>());

    const {query} = useRoute();

    const getStatus = computed(() => {
      const {status: routeStatus} = query;
      const {status} = props;
      return Number(routeStatus) || status;
    });

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue;
    });

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: '403',
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: "抱歉，你无权访问该页面",
      btnText: props.full ? "" : "返回首页",
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: '404',
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: "抱歉，你访问的页面不存在",
      btnText: props.full ? "" : "返回首页",
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });

    unref(statusMapRef).set(ExceptionEnum.ERROR, {
      title: '500',
      status: `${ExceptionEnum.ERROR}`,
      subTitle: "抱歉，服务器出错了",
      btnText: props.full ? "" : "返回首页",
      handler: () => go(),
    });

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
      title: "暂无数据",
      subTitle: '',
      btnText: "返回首页",
      icon: notDataSvg,
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
    });

    unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
      title: "网络错误",
      subTitle: "请检查您的网络连接是否正常！",
      btnText: "返回首页",
      handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      icon: netWorkSvg,
    });

    return () => {
      const {title, subTitle, btnText, icon, handler, status} = unref(getMapValue) || {};
      return (
        <Result
          status={status as any}
          title={props.title || title}
          sub-title={props.subTitle || subTitle}
        >
          {{
            extra: () =>
              btnText && (
                <Button type="primary" onClick={handler}>
                  {() => btnText}
                </Button>
              ),
            icon: () => (icon ? <img src={icon} /> : null),
          }}
        </Result>
      );
    };
  },
});
</script>
