import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const SidebarWrapper: ParentComponent = ({ children }) => {
  return (
    <aside
      class="flex-grow basis-14
        border-r border-slate-300 dark:border-slate-800
        bg-slate-200 dark:bg-stone-900/30"
      aria-label="Sidebar"
    >
      {children}
    </aside>
  );
};
