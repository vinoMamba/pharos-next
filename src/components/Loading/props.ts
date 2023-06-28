export const loadingProps = {
  loading: {
    type: Boolean,
    default: false,
  },
  tip: {
    type: String,
    default: '加载中...',
  },
  size: {
    type: String as PropType<'small' | 'large' | 'default'>,
    default: 'default',
  },
  absolute: {
    type: Boolean,
    default: false,
  }
}

export interface LoadingProps {
  loading: boolean
  tip?: string
  size?: 'small' | 'large' | 'default'
  absolute: boolean
}
