import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const SidebarInner: ParentComponent = ({ children }) => {
  return <div class="w-64 overflow-y-auto p-2xl">{children}</div>;
};
