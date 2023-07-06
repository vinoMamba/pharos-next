<script setup lang="ts">
import {ref, computed, useAttrs, unref, inject, watchEffect} from 'vue'
import {basicProps} from './props';
import type {BasicTableProps, SizeType, TableActionType} from './types/table';
import {PharosForm, useForm} from '../Form';
import {warn} from '/@/utils/log';
import {useDataSource} from './hooks/useDataSource';
import {useRowSelection} from './hooks/useRowSelection';
import {usePagination} from './hooks/usePagination';
import {useLoading} from './hooks/useLoading';
import {isFunction} from '/@/utils/is';
import {createTableContext} from './hooks/useTableContext';
import {omit} from 'lodash-es';
import {Table} from 'ant-design-vue';

const attrs = useAttrs()

const emit = defineEmits([
  'fetch-success',
  'fetch-error',
  'selection-change',
  'register',
  'row-click',
  'row-dbClick',
  'row-contextmenu',
  'row-mouseenter',
  'row-mouseleave',
  'edit-end',
  'edit-cancel',
  'edit-row-end',
  'edit-change',
  'expanded-rows-change',
  'change',
  'columns-change',
])

const props = defineProps(basicProps)

const tableElRef = ref(null);
const tableData = ref([]);

const wrapRef = ref(null);
const formRef = ref(null);
const innerPropsRef = ref<Partial<BasicTableProps>>();

const [registerForm, formActions] = useForm();

const getProps = computed(() => {
  return {...props, ...unref(innerPropsRef)} as BasicTableProps;
});
const isFixedHeightPage = inject('PageWrapperFixedHeight', false);

watchEffect(() => {
  unref(isFixedHeightPage) &&
    props.canResize &&
    warn(
      "'canResize' of BasicTable may not work in PageWrapper with 'fixedHeight' (especially in hot updates)",
    );
});


const {getLoading, setLoading} = useLoading(getProps);
const {
  getPaginationInfo,
  getPagination,
  setPagination,
  setShowPagination,
  getShowPagination,
} = usePagination(getProps);

const {
  getRowSelection,
  getRowSelectionRef,
  getSelectRows,
  setSelectedRows,
  clearSelectedRowKeys,
  getSelectRowKeys,
  deleteSelectRowByKey,
  setSelectedRowKeys,
} = useRowSelection(getProps, tableData, emit);

const {
  handleTableChange: onTableChange,
  getDataSourceRef,
  getDataSource,
  getRawDataSource,
  setTableData,
  updateTableDataRecord,
  deleteTableDataRecord,
  insertTableDataRecord,
  findTableDataRecord,
  fetch,
  getRowKey,
  reload,
  getAutoCreateKey,
  updateTableData,
} = useDataSource(
  getProps,
  {
    tableData,
    getPaginationInfo,
    setLoading,
    setPagination,
    getFieldsValue: formActions.getFieldsValue,
    clearSelectedRowKeys,
  },
  emit,
);

function handleTableChange(...args: any) {
  onTableChange.call(undefined, ...args);
  emit('change', ...args);
  // 解决通过useTable注册onChange时不起作用的问题
  const {onChange} = unref(getProps);
  onChange && isFunction(onChange) && onChange.call(undefined, ...args);
}

const {
  getViewColumns,
  getColumns,
  setCacheColumnsByField,
  setCacheColumns,
  setColumns,
  getColumnsRef,
  getCacheColumns,
} = useColumns(getProps, getPaginationInfo);

const {getScrollRef, redoHeight} = useTableScroll(
  getProps,
  tableElRef,
  getColumnsRef,
  getRowSelectionRef,
  getDataSourceRef,
  wrapRef,
  formRef,
);

const {scrollTo} = useTableScrollTo(tableElRef, getDataSourceRef);

const {customRow} = useCustomRow(getProps, {
  setSelectedRowKeys,
  getSelectRowKeys,
  clearSelectedRowKeys,
  getAutoCreateKey,
  emit,
});

const {getRowClassName} = useTableStyle(getProps, prefixCls);

const {getExpandOption, expandAll, expandRows, collapseAll} = useTableExpand(
  getProps,
  tableData,
  emit,
);

const handlers: InnerHandlers = {
  onColumnsChange: (data: ColumnChangeParam[]) => {
    emit('columns-change', data);
    // support useTable
    unref(getProps).onColumnsChange?.(data);
  },
};

const {getHeaderProps} = useTableHeader(getProps, slots, handlers);

const {getFooterProps} = useTableFooter(
  getProps,
  getScrollRef,
  tableElRef,
  getDataSourceRef,
);

const {getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchInfoChange} =
  useTableForm(getProps, slots, fetch, getLoading);

const getBindValues = computed(() => {
  const dataSource = unref(getDataSourceRef);
  let propsData: any = {
    ...attrs,
    customRow,
    ...unref(getProps),
    ...unref(getHeaderProps),
    scroll: unref(getScrollRef),
    loading: unref(getLoading),
    tableLayout: 'fixed',
    rowSelection: unref(getRowSelectionRef),
    rowKey: unref(getRowKey),
    columns: toRaw(unref(getViewColumns)),
    pagination: toRaw(unref(getPaginationInfo)),
    dataSource,
    footer: unref(getFooterProps),
    ...unref(getExpandOption),
  };
  // if (slots.expandedRowRender) {
  //   propsData = omit(propsData, 'scroll');
  // }

  propsData = omit(propsData, ['class', 'onChange']);
  return propsData;
});

const getEmptyDataIsShowTable = computed(() => {
  const {emptyDataIsShowTable, useSearchForm} = unref(getProps);
  if (emptyDataIsShowTable || !useSearchForm) {
    return true;
  }
  return !!unref(getDataSourceRef).length;
});

function setProps(props: Partial<BasicTableProps>) {
  innerPropsRef.value = {...unref(innerPropsRef), ...props};
}

const tableAction: TableActionType = {
  reload,
  getSelectRows,
  setSelectedRows,
  clearSelectedRowKeys,
  getSelectRowKeys,
  deleteSelectRowByKey,
  setPagination,
  setTableData,
  updateTableDataRecord,
  deleteTableDataRecord,
  insertTableDataRecord,
  findTableDataRecord,
  redoHeight,
  setSelectedRowKeys,
  setColumns,
  setLoading,
  getDataSource,
  getRawDataSource,
  setProps,
  getRowSelection,
  getPaginationRef: getPagination,
  getColumns,
  getCacheColumns,
  emit,
  updateTableData,
  setShowPagination,
  getShowPagination,
  setCacheColumnsByField,
  expandAll,
  expandRows,
  collapseAll,
  scrollTo,
  getSize: () => {
    return unref(getBindValues).size as SizeType;
  },
  setCacheColumns,
};
createTableContext({...tableAction, wrapRef, getBindValues});

defineExpose(tableAction);

emit('register', tableAction, formActions);

</script>
<template>
  <div ref="wrapRef">
    <PharosForm ref="formRef" submitOnReset v-bind="getFormProps" v-if="getBindValues.useSearchForm"
      :tableAction="tableAction" @register="registerForm" @submit="handleSearchInfoChange" @advanced-change="redoHeight">
      <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </PharosForm>
    <Table ref="tableElRef" v-bind="getBindValues" :rowClassName="getRowClassName" v-show="getEmptyDataIsShowTable"
      @change="handleTableChange">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <template #headerCell="{column}">
        <HeaderCell :column="column" />
      </template>
      <template #bodyCell="data">
        <slot name="bodyCell" v-bind="data || {}"></slot>
      </template>
    </Table>
  </div>
</template>
