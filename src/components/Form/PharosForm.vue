<script setup lang="ts">
import {Form, Row} from "ant-design-vue"
import {FormItem} from "./components/FormItem"
import {basicProps} from "./props";
import {reactive} from "vue";
import type {AdvanceState} from "./types/hooks";
import {ref} from "vue";
import type {FormActionType, FormProps, FormSchema} from "./types/form";
import {computed} from "vue";
import {unref} from "vue";
import {dateItemType} from "./helper";
import dayjs from "dayjs";
import {cloneDeep} from "lodash-es";
import {useFormEvents} from "./hooks/useFormEvents";
import type {Ref} from "vue";
import {createFormContext} from "./hooks/useFormContext";
import {onMounted} from "vue";
import {deepMerge} from "/@/utils/common";
import {watch} from "vue";
import {useDebounceFn} from "@vueuse/shared";
import {useFormValues} from "./hooks/useFormValues";
import {useAutoFocus} from "./hooks/useAutoFocus";
import {nextTick} from "vue";
import FormAction from "./components/FormAction.vue";
import useAdvanced from "./hooks/useAdvanced";

const props = defineProps(basicProps)
const emit = defineEmits(['advanced-change', 'reset', 'submit', 'register', 'field-value-change'])

const formModel = reactive({});
const advanceState = reactive<AdvanceState>({
  isAdvanced: true,
  hideAdvanceBtn: false,
  isLoad: false,
  actionSpan: 6,
});

const defaultValueRef = ref({});
const isInitedDefaultRef = ref(false);
const propsRef = ref<Partial<FormProps>>({});
const schemaRef = ref<FormSchema[] | null>(null);

const formElRef = ref<FormActionType | null>(null);

const getProps = computed((): FormProps => {
  //return {...props, ...unref(propsRef)};
  return deepMerge(props, unref(propsRef));
});

const getRow = computed(() => {
  const {baseRowStyle = {}, rowProps} = unref(getProps);
  return {
    style: baseRowStyle,
    ...rowProps,
  };
});

const getSchema = computed((): FormSchema[] => {
  const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
  for (const schema of schemas) {
    const {defaultValue, component, isHandleDateDefaultValue = true} = schema;
    // handle date type
    if (isHandleDateDefaultValue && defaultValue && dateItemType.includes(component)) {
      if (!Array.isArray(defaultValue)) {
        schema.defaultValue = dayjs(defaultValue);
      } else {
        const def: any[] = [];
        defaultValue.forEach((item) => {
          def.push(dayjs(item));
        });
        schema.defaultValue = def;
      }
    }
  }
  if (unref(getProps).showAdvancedButton) {
    return cloneDeep(
      schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[],
    );
  } else {
    return cloneDeep(schemas as FormSchema[]);
  }
});


const {handleToggleAdvanced, fieldsIsAdvancedMap} = useAdvanced({
  advanceState,
  emit,
  getProps,
  getSchema,
  formModel,
  defaultValueRef,
});

const {handleFormValues, initDefault} = useFormValues({
  getProps,
  defaultValueRef,
  getSchema,
  formModel,
});

useAutoFocus({
  getSchema,
  getProps,
  isInitedDefault: isInitedDefaultRef,
  formElRef: formElRef as Ref<FormActionType>,
});

const {
  handleSubmit,
  setFieldsValue,
  clearValidate,
  validate,
  validateFields,
  getFieldsValue,
  updateSchema,
  resetSchema,
  appendSchemaByField,
  removeSchemaByField,
  resetFields,
  scrollToField,
} = useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef: formElRef as Ref<FormActionType>,
  schemaRef: schemaRef as Ref<FormSchema[]>,
  handleFormValues,
});

createFormContext({
  resetAction: resetFields,
  submitAction: handleSubmit,
});

const getFormActionBindProps = computed(() => ({...getProps.value, ...advanceState}))

watch(
  () => unref(getProps).model,
  () => {
    const {model} = unref(getProps);
    if (!model) return;
    setFieldsValue(model);
  },
  {
    immediate: true,
  },
);

watch(
  () => unref(getProps).schemas,
  (schemas) => {
    resetSchema(schemas ?? []);
  },
);

watch(
  () => getSchema.value,
  (schema) => {
    nextTick(() => {
      //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
    });
    if (unref(isInitedDefaultRef)) {
      return;
    }
    if (schema?.length) {
      initDefault();
      isInitedDefaultRef.value = true;
    }
  },
);

watch(
  () => formModel,
  useDebounceFn(() => {
    unref(getProps).submitOnChange && handleSubmit();
  }, 300),
  {deep: true},
);

async function setProps(formProps: Partial<FormProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
}

function setFormModel(key: string, value: any, schema: FormSchema) {
  formModel[key] = value;
  emit('field-value-change', key, value);
  // TODO 优化验证，这里如果是autoLink=false手动关联的情况下才会再次触发此函数
  if (schema && schema.itemProps && !schema.itemProps.autoLink) {
    validateFields([key]).catch((_) => {});
  }
}


function handleEnterPress(e: KeyboardEvent) {
  const {autoSubmitOnEnter} = unref(getProps);
  if (!autoSubmitOnEnter) return;
  if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
    const target: HTMLElement = e.target as HTMLElement;
    if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
      handleSubmit();
    }
  }
}

const formActionType: Partial<FormActionType> = {
  getFieldsValue,
  setFieldsValue,
  resetFields,
  updateSchema,
  resetSchema,
  setProps,
  removeSchemaByField,
  appendSchemaByField,
  clearValidate,
  validateFields,
  validate,
  submit: handleSubmit,
  scrollToField: scrollToField,
};

onMounted(() => {
  initDefault();
  emit('register', formActionType);
});
</script>
<template>
  <Form ref="formElRef" :model="formModel" @keypress.enter="handleEnterPress">
    <Row v-bind="getRow">
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem :is-advanced="fieldsIsAdvancedMap[schema.field]" :table-action="tableAction"
          :form-action-type="formActionType" :form-props="getProps" :all-default-values="defaultValueRef"
          :form-model="formModel" :set-form-model="setFormModel" :schema="schema">
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>

      <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
        <template #[item]="data" v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']">
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
    </Row>
  </Form>
</template>
