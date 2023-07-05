import type {ExtractPropTypes} from "vue";
import {PharosButton} from "./PharosButton";
import type {buttonProps} from "./props";

export const Button = PharosButton;
export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
