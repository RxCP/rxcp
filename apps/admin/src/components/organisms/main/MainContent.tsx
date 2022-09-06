import type { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };
type ParentComponent<P = {}> = Component<ParentProps<P>>;

export const MainContent: ParentComponent = ({ children }) => {
  return (
    <div class="dark:bg-slate-800 rounded p-4">
      {children}
    </div>
  );
};
