import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const SiteWrapper: ParentComponent = ({ children }) => {
  return (
    <div class="flex flex-wrap h-full">
      {children}
    </div>
  );
};
