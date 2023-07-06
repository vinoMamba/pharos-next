import {defineComponent, computed, unref, toRaw} from "vue";
import {Table, type TableProps} from "ant-design-vue";
import {useTableContext} from "../hooks/useTableContext";
import {cloneDeep} from "lodash-es";
import {isFunction} from "/@/utils/is";
import type {BasicColumn} from "../types/table";
import {INDEX_COLUMN_FLAG} from "../const";

export const TableFooter = defineComponent({
  name: 'TableFooter',
  props: {
    summaryFunc: {
      type: Function as PropType<Fn>,
    },
    summaryData: {
      type: Array as PropType<Recordable[]>,
    },
    scroll: {
      type: Object as PropType<Recordable>,
    },
    rowKey: {type: String, default: 'key'},
  },
  setup(props) {
    const SUMMARY_ROW_KEY = '_row';
    const SUMMARY_INDEX_KEY = '_index';
    const table = useTableContext()

    const getDataSource = computed((): Recordable[] => {
      const {summaryFunc, summaryData} = props;
      if (summaryData?.length) {
        summaryData.forEach((item, i) => (item[props.rowKey] = `${i}`));
        return summaryData;
      }
      if (!isFunction(summaryFunc)) {
        return [];
      }
      let dataSource = toRaw(unref(table.getDataSource()));
      dataSource = summaryFunc(dataSource);
      dataSource.forEach((item, i) => {
        item[props.rowKey] = `${i}`;
      });
      return dataSource;
    });

    const getColumns = computed(() => {
      const dataSource = unref(getDataSource);
      const columns: BasicColumn[] = cloneDeep(table.getColumns());
      const index = columns.findIndex((item) => item.flag === INDEX_COLUMN_FLAG);
      const hasRowSummary = dataSource.some((item) => Reflect.has(item, SUMMARY_ROW_KEY));
      const hasIndexSummary = dataSource.some((item) => Reflect.has(item, SUMMARY_INDEX_KEY));

      if (index !== -1) {
        if (hasIndexSummary) {
          columns[index].customRender = ({record}) => record[SUMMARY_INDEX_KEY];
          columns[index].ellipsis = false;
        } else {
          Reflect.deleteProperty(columns[index], 'customRender');
        }
      }

      if (table.getRowSelection() && hasRowSummary) {
        const isFixed = columns.some((col) => col.fixed === 'left');
        columns.unshift({
          width: 60,
          title: 'selection',
          key: 'selectionKey',
          align: 'center',
          ...(isFixed ? {fixed: 'left'} : {}),
          customRender: ({record}) => record[SUMMARY_ROW_KEY],
        });
      }
      return columns;
    });

    const basicProps = computed(() => ({
      showHeader: false,
      bordered: false,
      tableLayout: 'fixed',
      scroll: props.scroll,
      getDataSource: unref(getDataSource),
      columns: unref(getColumns),
      rowKey: r => r[props.rowKey]
    } as TableProps<any>))

    return () => (
      <>
        <Table {...unref(basicProps)} />
      </>
    )
  }
})
