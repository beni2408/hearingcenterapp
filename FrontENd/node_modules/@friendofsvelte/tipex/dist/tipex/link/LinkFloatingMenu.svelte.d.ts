import type { TipexEditor } from '../Tipex.svelte';
export interface LinkFloatingMenuProps {
    floatingRef: HTMLDivElement | undefined;
    tipex: TipexEditor;
}
declare const LinkFloatingMenu: import("svelte").Component<LinkFloatingMenuProps, {}, "floatingRef">;
type LinkFloatingMenu = ReturnType<typeof LinkFloatingMenu>;
export default LinkFloatingMenu;
