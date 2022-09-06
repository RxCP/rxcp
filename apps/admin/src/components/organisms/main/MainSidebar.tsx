import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const MainSidebar: ParentComponent = ({ children }) => {
  return (
    <div class="flex-none border-r dark:border-slate-800 w-52 dark:bg-slate-800/20">
      {children}
    </div>
  );
};
