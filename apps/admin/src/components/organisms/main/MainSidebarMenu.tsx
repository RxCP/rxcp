import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const MainSidebarMenu: ParentComponent = ({ children }) => {
  return <ul class="mt-4">{children}</ul>;
};
