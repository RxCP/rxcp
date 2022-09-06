import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const SidebarMenuItem: ParentComponent = ({ children }) => {
  return <li>{children}</li>;
};
