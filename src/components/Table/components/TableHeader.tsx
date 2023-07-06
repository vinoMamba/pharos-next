import {defineComponent, unref, computed} from "vue";
import type {TableSetting} from "../types/table";
import {TableTitle} from "./TableTitle";

export const TableHeader = defineComponent({
  name: 'TableHeader',
  props: {
    title: {
      type: [Function, String] as PropType<string | ((data: any) => string)>,
    },
    tableSetting: {
      type: Object as PropType<TableSetting>,
    },
    showTableSetting: {
      type: Boolean,
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
  },
  emits: ['columns-change'],
  setup(props, {slots}) {

    const renderHeaderTopSlot = () => {
      return slots.headerTop
        ? <div class="m-5">{slots.headerTop()}</div>
        : null
    }

    const titleProps = computed(() => {
      const {title, titleHelpMessage} = props
      return {
        helpMessage: titleHelpMessage,
        title
      }
    })

    return () => (
      <div class="w-full">
        {renderHeaderTopSlot()}
        <div class="flex items-center">
          {
            slots.tableTitle
              ? slots.tableTitle()
              : <TableTitle {...unref(titleProps)} />
          }
          {slots.toolbar && slots.toolbar()}
        </div>
      </div>
    )
  }
})
