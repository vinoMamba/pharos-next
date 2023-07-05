<script setup lang="ts">
import type {PropType} from 'vue';
import {type ButtonProps, Button} from "/@/components/Button"
import type {ColEx} from '../types';
import {useFormContext} from '../hooks/useFormContext';
import {computed} from 'vue';
import {Col, Form} from "ant-design-vue"

const props = defineProps({
  showActionButtonGroup: {
    type: Boolean,
    default: true,
  },
  showResetButton: {
    type: Boolean,
    default: true,
  },
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  showAdvancedButton: {
    type: Boolean,
    default: true,
  },
  resetButtonOptions: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
  },
  submitButtonOptions: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
  },
  actionColOptions: {
    type: Object as PropType<Partial<ColEx>>,
    default: () => ({}),
  },
  actionSpan: {
    type: Number,
    default: 6
  },
  isAdvanced: {
    type: Boolean,
    default: false
  },
  hideAdvanceBtn: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['toggle-advanced'])

const actionColOpt = computed(() => {
  const {showAdvancedButton, actionSpan: span, actionColOptions} = props;
  const actionSpan = 24 - span;
  const advancedSpanObj = showAdvancedButton
    ? {span: actionSpan < 6 ? 24 : actionSpan}
    : {};
  const actionColOpt: Partial<ColEx> = {
    style: {textAlign: 'right'},
    span: showAdvancedButton ? 6 : 4,
    ...advancedSpanObj,
    ...actionColOptions,
  };
  return actionColOpt;
});

const getResetBtnOptions = computed(() => {
  return Object.assign(
    {
      text: '重置',
    },
    props.resetButtonOptions,
  );
});
const getSubmitBtnOptions = computed(() => {
  return Object.assign(
    {
      text: '提交',
    },
    props.submitButtonOptions,
  );
});

function toggleAdvanced() {
  emit('toggle-advanced');
}

const {resetAction, submitAction} = useFormContext();

</script>
<template>
  <Col v-bind="actionColOpt" v-if="showActionButtonGroup">
  <div style="width: 100%" :style="{textAlign: actionColOpt.style.textAlign}">
    <Form.Item>
      <slot name="resetBefore"></slot>
      <Button type="default" class="mr-2" v-bind="getResetBtnOptions" @click="resetAction" v-if="showResetButton">
        {{ getResetBtnOptions.text }}
      </Button>
      <slot name="submitBefore"></slot>

      <Button type="primary" class="mr-2" v-bind="getSubmitBtnOptions" @click="submitAction" v-if="showSubmitButton">
        {{ getSubmitBtnOptions.text }}
      </Button>

      <slot name="advanceBefore"></slot>
      <Button type="link" size="small" @click="toggleAdvanced" v-if="showAdvancedButton && !hideAdvanceBtn">
        {{ isAdvanced ? '展开' : '收起' }}
        <BasicArrow class="ml-1" :expand="!isAdvanced" up />
      </Button>
      <slot name="advanceAfter"></slot>
    </Form.Item>
  </div>
  </Col>
</template>
