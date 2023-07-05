import {defineComponent} from "vue";
import {Tooltip} from "ant-design-vue"
import {InfoCircleOutlined} from "@ant-design/icons-vue";
import type {TooltipPlacement} from "ant-design-vue/lib/tooltip";
import type {CSSProperties} from "vue";
import {unref} from "vue";
import {computed} from "vue";
import {isArray, isString} from "/@/utils/is";

export const PharosHelp = defineComponent({
  name: 'PharosHelp',
  props: {
    maxWidth: {type: String, default: '600px'},
    showIndex: {type: Boolean},
    color: {type: String, default: '#ffffff'},
    fontSize: {type: String, default: '14px'},
    placement: {type: String as PropType<TooltipPlacement>, default: 'right'},
    text: {type: [Array, String] as PropType<string[] | string>},
  },
  setup(props, {slots}) {

    const getTooltipStyle = computed(
      (): CSSProperties => ({color: props.color, fontSize: props.fontSize}),
    );


    function renderTitle() {
      const textList = props.text;

      if (isString(textList)) {
        return <p>{textList}</p>;
      }

      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          );
        });
      }
      return null;
    }

    return () => (
      <Tooltip
        title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
        placement={props.placement || 'right'}
      >
        <span>{
          slots.default?.() || <InfoCircleOutlined />
        }</span>
      </Tooltip>
    )
  }
})
