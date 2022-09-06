import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const SidebarMenu: ParentComponent = ({children}) => {
  return (
    <ul class="space-y-2">
      {children}
    </ul>
  );
};
