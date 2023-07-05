import type {ComponentType} from '../types/index';
import {tryOnUnmounted} from '@vueuse/core';
import type {Component} from 'vue';
import {add, del} from '../compoentMap';

export function useComponentRegister(compName: ComponentType, comp: Component) {
  add(compName, comp);
  tryOnUnmounted(() => {
    del(compName);
  });
}

