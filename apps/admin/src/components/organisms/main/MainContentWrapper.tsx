import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const MainContentWrapper: ParentComponent = ({ children }) => {
  return (
    <div class="mx-6 flex-1 py-4">
      {children}
    </div>
  );
};
