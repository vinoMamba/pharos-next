import {defineComponent, computed, unref} from "vue";
import {Title} from "../../Title";
import {isFunction} from "/@/utils/is";

export const TableTitle = defineComponent({
  name: 'TableTitle',
  props: {
    title: {
      type: [Function, String] as PropType<string | ((data: any) => string)>,
    },
    getSelectRows: {
      type: Function as PropType<() => any[]>,
    },
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
    },
  },
  setup(props) {
    const getTitle = computed(() => {
      const {title, getSelectRows = () => {}} = props;
      let tit = title;

      if (isFunction(title)) {
        tit = title({
          selectRows: getSelectRows(),
        });
      }
      return tit;
    });

    const helpMsg = computed(() => props.helpMessage)

    return () => (
      <>
        {unref(getTitle) && <Title helpMessage={unref(helpMsg)} >{unref(getTitle)}</Title>}
      </>
    )
  }
})
