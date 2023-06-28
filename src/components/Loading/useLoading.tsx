import {unref} from "vue";
import {createLoaidng} from ".";
import type {LoadingProps} from "./props";

export interface UseLoadingOptions {
  target?: any;
  props?: Partial<LoadingProps>;
}

interface Fn {
  (): void;
}
interface Fn {
  (): void
}

export type ReturnType = [Fn, Fn]


export function useLoading(props: Partial<LoadingProps>): ReturnType
export function useLoading(opt: Partial<UseLoadingOptions>): ReturnType

export function useLoading(opt: Partial<UseLoadingOptions> | Partial<LoadingProps>): ReturnType {
  let props: Partial<LoadingProps>
  let target: HTMLElement = document.body

  if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
    props = (opt as Partial<UseLoadingOptions>).props || {}
    target = (opt as Partial<UseLoadingOptions>).target || document.body
    props.absolute = true
  } else {
    props = opt as Partial<LoadingProps>
  }

  const instance = createLoaidng(props as LoadingProps)

  const open = () => {
    const unrefTarget = unref(target)
    if (unrefTarget) {
      instance.open(unrefTarget)
    }
  }
  const close = () => {
    instance.close()
  }

  return [open, close]
}

