import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const Header: ParentComponent = ({ children }) => {
  return <header class="flex items-center mb-6">{children}</header>;
};
