import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const MainInner: ParentComponent = ({ children }) => {
  return <div class="flex h-full">{children}</div>;
};
