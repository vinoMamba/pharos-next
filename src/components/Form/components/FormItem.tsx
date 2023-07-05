import {type PropType, defineComponent} from "vue";
import {Form, Col, Divider} from "ant-design-vue";
import type {FormSchema} from "..";
import type {FormActionType, FormProps} from "../types/form";
import {toRefs} from "vue";
import {useItemLabelWidth} from "../hooks/useLabelWidth";
import {computed} from "vue";
import {isBoolean, isFunction, isNull} from "/@/utils/is";
import {unref} from "vue";
import {cloneDeep, upperFirst} from "lodash-es";
import type {RuleObject} from "ant-design-vue/lib/form";
import {NO_AUTO_LINK_COMPONENTS, createPlaceholderMessage, setComponentRuleType} from "../helper";
import {componentMap} from "../compoentMap";
import {Help} from "/@/components/Help"
import {getSlot} from "/@/utils/helper/tsxHelper";

export const FormItem = defineComponent({
  name: 'FormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      default: () => ({})
    },
    formProps: {
      type: Object as PropType<FormProps>,
      default: () => ({})
    },
    allDefaultValues: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    formModel: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any, schema: FormSchema) => void>,
      default: null,
    },
    tableAction: {
      type: Object as PropType<any>,
      default: null,
    },
    formActionType: {
      type: Object as PropType<FormActionType>,
    },
    isAdvanced: {
      type: Boolean,
    },
  },
  setup(props, {slots}) {
    const {schema, formProps} = toRefs(props)

    const itemLabelWidthProps = useItemLabelWidth(schema, formProps)

    const getValues = computed(() => {
      const {allDefaultValues, formModel, schema} = props
      const {mergeDynamicData} = props.formProps
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel,
        },
        schema
      }
    })

    const getComponentProps = computed<Recordable<any>>(() => {
      const {schema, tableAction, formModel, formActionType} = props
      let {componentProps = {}} = schema
      if (isFunction(componentProps)) {
        componentProps = componentProps({schema, tableAction, formModel, formActionType}) ?? {}
      }
      return componentProps
    })

    const getDisabled = computed(() => {
      const {disabled: globDisabled} = props.formProps
      const {dynamicDisabled} = props.schema
      const {disabled: itemDisabled} = unref(getComponentProps)
      let disabled = !!globDisabled || itemDisabled
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues))
      }
      return disabled
    })

    const getShow = computed(() => {
      const {show, ifShow} = props.schema
      const {showAdvancedButton} = props.formProps
      const itemIsAdvanced = showAdvancedButton ? isBoolean(props.isAdvanced) ? props.isAdvanced : true : true
      let isShow = true;
      let isIfShow = true;

      if (isBoolean(show)) {
        isShow = show;
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow;
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues));
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues));
      }
      isShow = isShow && itemIsAdvanced;
      return {isShow, isIfShow};
    })

    function handleRules(): RuleObject[] {

      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required,
      } = props.schema;

      if (isFunction(dynamicRules)) {
        return dynamicRules(unref(getValues)) as RuleObject[];
      }

      let rules: RuleObject[] = cloneDeep(defRules) as [];
      const {rulesMessageJoinLabel: globalRulesMessageJoinLabel} = props.formProps;

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel;
      const defaultMsg = createPlaceholderMessage(component) + `${joinLabel ? label : ''}`;

      function validator(rule: any, value: any) {
        const msg = rule.message || defaultMsg;
        if (value === undefined || isNull(value)) {
          // 空值
          return Promise.reject(msg);
        } else if (Array.isArray(value) && value.length === 0) {
          // 数组类型
          return Promise.reject(msg);
        } else if (typeof value === 'string' && value.trim() === '') {
          // 空字符串
          return Promise.reject(msg);
        } else if (
          typeof value === 'object' &&
          Reflect.has(value, 'checked') &&
          Reflect.has(value, 'halfChecked') &&
          Array.isArray(value.checked) &&
          Array.isArray(value.halfChecked) &&
          value.checked.length === 0 &&
          value.halfChecked.length === 0
        ) {
          // 非关联选择的tree组件
          return Promise.reject(msg);
        }
        return Promise.resolve();
      }

      const getRequired = isFunction(required) ? required(unref(getValues)) : required;

      /*
       * 1、若设置了required属性，又没有其他的rules，就创建一个验证规则；
       * 2、若设置了required属性，又存在其他的rules，则只rules中不存在required属性时，才添加验证required的规则
       *     也就是说rules中的required，优先级大于required
       */
      if (getRequired) {
        if (!rules || rules.length === 0) {
          rules = [{required: getRequired, validator}];
        } else {
          const requiredIndex: number = rules.findIndex((rule) => Reflect.has(rule, 'required'));

          if (requiredIndex === -1) {
            rules.push({required: getRequired, validator});
          }
        }
      }

      const requiredRuleIndex: number = rules.findIndex(
        (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
      );

      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex];
        const {isShow} = unref(getShow);
        if (!isShow) {
          rule.required = false;
        }
        if (component) {
          if (!Reflect.has(rule, 'type')) {
            rule.type = component === 'InputNumber' ? 'number' : 'string';
          }

          rule.message = rule.message || defaultMsg;

          if (component.includes('Input') || component.includes('Textarea')) {
            rule.whitespace = true;
          }
          const valueFormat = unref(getComponentProps)?.valueFormat;
          setComponentRuleType(rule, component, valueFormat);
        }
      }

      // Maximum input length rule check
      const characterInx = rules.findIndex((val) => val.max);
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message =
          rules[characterInx].message || 'The maximum input length is exceeded';
      }
      return rules;
    }

    function renderComponent() {
      const {
        renderComponentContent,
        component,
        field,
        changeEvent = 'change',
        valueField,
      } = props.schema;

      const isCheck = component && ['Switch', 'Checkbox'].includes(component);

      const eventKey = `on${upperFirst(changeEvent)}`;

      const on = {
        [eventKey]: (...args: Nullable<Recordable<any>>[]) => {
          const [e] = args;
          if (propsData[eventKey]) {
            propsData[eventKey](...args);
          }
          const target = e ? e.target : null;
          const value = target ? (isCheck ? target.checked : target.value) : e;
          props.setFormModel(field, value, props.schema);
        },
      };
      const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>;

      const {autoSetPlaceHolder, size} = props.formProps;
      const propsData: Recordable<any> = {
        allowClear: true,
        getPopupContainer: (trigger: Element) => trigger.parentNode,
        size,
        ...unref(getComponentProps),
        disabled: unref(getDisabled),
      };

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
      // RangePicker place is an array
      if (isCreatePlaceholder && component !== 'RangePicker' && component) {
        propsData.placeholder =
          unref(getComponentProps)?.placeholder || createPlaceholderMessage(component);
      }
      propsData.codeField = field;
      propsData.formValues = unref(getValues);

      const bindValue: Recordable<any> = {
        [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[field],
      };

      const compAttr: Recordable<any> = {
        ...propsData,
        ...on,
        ...bindValue,
      };

      if (!renderComponentContent) {
        return <Comp {...compAttr} />;
      }
      const compSlot = isFunction(renderComponentContent)
        ? {...renderComponentContent(unref(getValues))}
        : {
          default: () => renderComponentContent,
        };
      return <Comp {...compAttr}>{compSlot}</Comp>;
    }

    function renderLabelHelpMessage() {
      const {label, helpMessage, helpComponentProps, subLabel} = props.schema;
      const renderLabel = subLabel ? (
        <span>
          {label} <span class="text-secondary">{subLabel}</span>
        </span>
      ) : (
        label
      );
      const getHelpMessage = isFunction(helpMessage)
        ? helpMessage(unref(getValues))
        : helpMessage;
      if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
        return renderLabel;
      }
      return (
        <span>
          {renderLabel}
          <Help placement="top" class="mx-1" text={getHelpMessage} {...helpComponentProps} />
        </span>
      );
    }

    function renderItem() {
      const {itemProps, slot, render, field, suffix, component} = props.schema;
      const {labelCol, wrapperCol} = unref(itemLabelWidthProps);
      const {colon} = props.formProps;

      if (component === 'Divider') {
        return (
          <Col span={24}>
            <Divider {...unref(getComponentProps)}>{renderLabelHelpMessage()}</Divider>
          </Col>
        );
      } else {
        const getContent = () => {
          return slot
            ? getSlot(slots, slot, unref(getValues))
            : render
              ? render(unref(getValues))
              : renderComponent();
        };

        const showSuffix = !!suffix;
        const getSuffix = isFunction(suffix) ? suffix(unref(getValues)) : suffix;

        // TODO 自定义组件验证会出现问题，因此这里框架默认将自定义组件设置手动触发验证，如果其他组件还有此问题请手动设置autoLink=false
        if (NO_AUTO_LINK_COMPONENTS.includes(component)) {
          props.schema &&
            (props.schema.itemProps! = {
              autoLink: false,
              ...props.schema.itemProps,
            });
        }

        return (
          <Form.Item
            name={field}
            colon={colon}
            class={{'suffix-item': showSuffix}}
            {...(itemProps as Recordable<any>)}
            label={renderLabelHelpMessage()}
            rules={handleRules()}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <div style="display:flex">
              <div style="flex:1;">{getContent()}</div>
              {showSuffix && <span class="suffix">{getSuffix}</span>}
            </div>
          </Form.Item>
        );
      }
    }


    return () => {
      const {colProps = {}, colSlot, renderColContent, component} = props.schema;
      if (!componentMap.has(component)) {
        return null;
      }

      const {baseColProps = {}} = props.formProps;
      const realColProps = {...baseColProps, ...colProps};
      const {isIfShow, isShow} = unref(getShow);
      const values = unref(getValues);

      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values)
          : renderColContent
            ? renderColContent(values)
            : renderItem();
      };

      return (
        isIfShow && (
          <Col {...realColProps} v-show={isShow}>
            {getContent()}
          </Col>
        )
      );
    }
  }
})
