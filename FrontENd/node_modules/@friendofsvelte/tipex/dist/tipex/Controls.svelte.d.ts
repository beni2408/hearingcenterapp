import type { Snippet } from 'svelte';
import type { TipexEditor } from './Tipex.svelte';
/**
 * Defines the properties for the default Controls component.
 */
export interface ControlsProps {
    children?: Snippet;
    tipex: TipexEditor;
}
declare const Controls: import("svelte").Component<ControlsProps, {}, "">;
type Controls = ReturnType<typeof Controls>;
export default Controls;
